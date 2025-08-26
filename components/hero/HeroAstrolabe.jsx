"use client"

// Pure three.js implementation (no react-three-fiber) to avoid peer dependency issues.

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"

export default function HeroAstrolabe() {
  const mountRef = useRef(null)
  const rendererRef = useRef(null)
  const sceneRef = useRef(null)
  const cameraRef = useRef(null)
  const groupRef = useRef(null)
  const rafRef = useRef(0)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const scene = new THREE.Scene()
    sceneRef.current = scene
    const camera = new THREE.PerspectiveCamera(55, mount.clientWidth / mount.clientHeight, 0.1, 100)
    camera.position.set(0, 0.4, 2.4)
    cameraRef.current = camera

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    rendererRef.current = renderer
    mount.appendChild(renderer.domElement)

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.7))
    const spot = new THREE.SpotLight(0xffffff, 1.1, 10, 0.4, 0.8)
    spot.position.set(3, 6, 5)
    scene.add(spot)
    const dir = new THREE.DirectionalLight(0xffffff, 0.6)
    dir.position.set(-3, 2, -2)
    scene.add(dir)

    // Holder group with idle float/rotation
    const holder = new THREE.Group()
    holder.position.y = -0.2
    groupRef.current = holder
    scene.add(holder)

    // Try load GLB; if fails, fall back to procedural
    const loader = new GLTFLoader()
    let loaded = false
    loader.load(
      "/models/astrolabe.glb",
      (gltf) => {
        loaded = true
        holder.add(gltf.scene)
      },
      undefined,
      () => {
        // Procedural fallback
        const matGlow = new THREE.MeshBasicMaterial({ color: 0x66e0ff, transparent: true, opacity: 0.7 })
        const matPurple = new THREE.MeshBasicMaterial({ color: 0x9f7aea, transparent: true, opacity: 0.5 })
        const ring1 = new THREE.Mesh(new THREE.TorusGeometry(0.6, 0.004, 16, 160), matGlow)
        ring1.rotation.x = Math.PI * 0.26
        const ring2 = new THREE.Mesh(new THREE.TorusGeometry(0.85, 0.005, 16, 200), matPurple)
        ring2.rotation.y = Math.PI * 0.18
        const ring3 = new THREE.Mesh(new THREE.TorusGeometry(1.1, 0.006, 16, 220), matGlow)
        ring3.rotation.z = Math.PI * 0.12
        const core = new THREE.Mesh(new THREE.IcosahedronGeometry(0.18, 1), new THREE.MeshPhongMaterial({ color: 0x66e0ff, emissive: 0x224455, shininess: 60 }))
        const knot = new THREE.Mesh(new THREE.TorusKnotGeometry(0.35, 0.008, 220, 12), new THREE.MeshBasicMaterial({ color: 0x9f7aea, transparent: true, opacity: 0.4 }))
        knot.rotation.x = Math.PI * 0.45
        holder.add(ring1, ring2, ring3, core, knot)
      }
    )

    const onResize = () => {
      if (!mount) return
      const w = mount.clientWidth
      const h = mount.clientHeight
      renderer.setSize(w, h)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    window.addEventListener("resize", onResize)

    const clock = new THREE.Clock()
    const animate = () => {
      const t = clock.getElapsedTime()
      if (groupRef.current) {
        groupRef.current.rotation.y = t * 0.15
        groupRef.current.position.y = -0.2 + Math.sin(t * 0.8) * 0.05
      }
      renderer.render(scene, camera)
      rafRef.current = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener("resize", onResize)
      if (renderer && renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement)
      renderer.dispose()
    }
  }, [])

  return <div ref={mountRef} className="absolute inset-0" />
}
