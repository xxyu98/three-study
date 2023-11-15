import * as THREE from 'three'

import { OrbitControls } from 'three/orbitControls'

import Stats from 'three/stats'

const size = 10 // 模型大小

const gap = 5 // 模型间距

const color = 'aqua'

const replace = 10 // 循环次数

// TODO 场景 物体
const scene = new THREE.Scene

function createdMesh(x, y, z) {
  const geometry = new THREE.BoxGeometry(size, size, size)

  const material = new THREE.MeshLambertMaterial({
    color: color,
    transparent: true,
    opacity: 0.9
  })

  const mesh = new THREE.Mesh(geometry, material)

  mesh.position.set(x, y, z)

  scene.add(mesh)
}

for (let i = 0; i < replace; i++) {
  for (let j = 0; j < replace; j++) {
    createdMesh((size + gap) * i, 0, (size + gap) * j)
  }
}

// 平行光
const direction = new THREE.DirectionalLight(0xffffff)
direction.position.set(50, 0, 10)
scene.add(direction)

// 点光源
const light = new THREE.PointLight(0xffffff, 1.0);
light.position.set(40, 40, 40);
scene.add(light);

const ambient = new THREE.AmbientLight(0xffffff, 0.4)
scene.add(ambient)

// TODO 相机

const width = window.innerWidth;
const height = window.innerHeight;

// PerspectiveCamera 透视相机
const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000)

camera.position.set((size + gap) * replace, (size + gap) * replace, (size + gap) * replace)

// camera 观察的目标
camera.lookAt((size + gap) * replace / 2, 0, (size + gap) * replace / 2)

// 渲染器
const renderer = new THREE.WebGLRenderer()

renderer.setSize(width, height)

// 渲染(场景 相机)
renderer.render(scene, camera)

// 相机轨道控制
const controls = new OrbitControls(camera, renderer.domElement)
controls.target.set((size + gap) * replace / 2, 0, (size + gap) * replace / 2)
controls.update()

controls.addEventListener('change', function () {
  renderer.render(scene, camera)
})

// 窗口事件
window.onresize = function () {
  renderer.render(scene, camera)
  renderer.setSize(window.innerWidth, window.innerHeight)
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
}

// 帧率插件
const stats = new Stats()
document.body.appendChild(stats.domElement)

document.body.appendChild(renderer.domElement)

