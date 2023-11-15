import * as THREE from 'three'

import { OrbitControls } from 'three/orbitControls'

import Stats from 'three/stats'

// TODO 场景 物体
const scene = new THREE.Scene

// xyz 轴辅助线
const axesHelper = new THREE.AxesHelper(100)
scene.add(axesHelper)

// 形状 BoxGeometry 长方体
const geometry = new THREE.BoxGeometry(20, 20, 20)
// const geometry = new THREE.CylinderGeometry(20, 20, 100)

// 外观材质对象
// const material = new THREE.MeshBasicMaterial({
//   color: 'aqua',
//   transparent: true,
//   opacity: 0.5
// })
const material = new THREE.MeshLambertMaterial({
  color: 'springgreen',
  transparent: true,
  opacity: 0.9
})

// mesh 网格模型 用来表示物体 把几何体 材质作为网格模型的参数
const mesh = new THREE.Mesh(geometry, material)

// 设置位置 x y z
mesh.position.set(0, 0, 0)
mesh.name = 'hhh'

// 添加到场景
scene.add(mesh)

// 点光源
const light = new THREE.PointLight(0xfff, 1.0);
light.position.set(40, 40, 40);
scene.add(light);

// 点光源 helper
const lightHelper = new THREE.PointLightHelper(light, 4, '#ffc238')
scene.add(lightHelper)

// 环境光
const ambient = new THREE.AmbientLight(0xfff, 0.4)
scene.add(ambient)

// 平行光
const direction = new THREE.DirectionalLight(0xfff)
direction.position.set(50, 0, 10)
scene.add(direction)

// 平行光 helper
const directionHelper = new THREE.DirectionalLightHelper(direction, 2, '#fff')
scene.add(directionHelper)

// 1000 个盒子测试
// for (let index = 0; index < 1000; index++) {
//   const geometry = new THREE.BoxGeometry(5, 5, 5)

//   const material = new THREE.MeshLambertMaterial({
//     color: 0x00ffff,
//     transparent: true,
//     opacity: 0.9
//   })
//   const mesh = new THREE.Mesh(geometry, material)
  
//   const x = (Math.random() - 0.5) * 200
//   const y = (Math.random() - 0.5) * 200
//   const z = (Math.random() - 0.5) * 200

//   mesh.position.set(x, y ,z)
 
//   scene.add(mesh)
// }

// TODO 相机

const width = window.innerWidth;
const height = window.innerHeight;

// PerspectiveCamera 透视相机
const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000)

camera.position.set(200, 200, 200)

// camera 观察的目标
camera.lookAt(mesh.position)

// 渲染器
const renderer = new THREE.WebGLRenderer()

renderer.setSize(width, height)

// 渲染(场景 相机)
renderer.render(scene, camera)

// 相机轨道控制
const controls = new OrbitControls(camera, renderer.domElement)

controls.addEventListener('change', function () {
  // renderer.render(scene, camera)
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


function render() {
  stats.update()
  mesh.rotateY(0.02)
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}
render()

document.body.appendChild(renderer.domElement)

