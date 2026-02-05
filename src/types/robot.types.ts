import type { Bone, SkinnedMesh } from 'three'

export interface BoneNode {
  name: string
  bone: Bone
  parent: string | null
  children: string[]
  defaultRotation: { x: number; y: number; z: number }
  defaultPosition: { x: number; y: number; z: number }
}

export interface BoneHierarchy {
  root: string
  bones: Map<string, BoneNode>
  skinnedMesh: SkinnedMesh | null
}

export interface BonePose {
  [boneName: string]: {
    rotation?: { x: number; y: number; z: number }
    position?: { x: number; y: number; z: number }
  }
}

export interface RobotState {
  currentAnimation: string
  bones: BoneHierarchy | null
  isAIControlled: boolean
  customPose: BonePose | null
}

export interface SceneObject {
  id: string
  name: string
  type: string
  position: [number, number, number]
  interactable: boolean
}
