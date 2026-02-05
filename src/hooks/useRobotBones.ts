import { useEffect, useState, useCallback, useRef } from 'react'
import { Bone, SkinnedMesh, Euler, Vector3 } from 'three'
import type { Object3D } from 'three'
import type { BoneHierarchy, BoneNode, BonePose } from '../types/robot.types'

export function useRobotBones(scene: Object3D | null) {
  const [boneHierarchy, setBoneHierarchy] = useState<BoneHierarchy | null>(null)
  const bonesRef = useRef<Map<string, Bone>>(new Map())
  const defaultPosesRef = useRef<Map<string, { rotation: Euler; position: { x: number; y: number; z: number } }>>(new Map())

  useEffect(() => {
    if (!scene) return

    const bones = new Map<string, BoneNode>()
    let rootBone: string | null = null
    let skinnedMesh: SkinnedMesh | null = null

    scene.traverse((object) => {
      if ((object as SkinnedMesh).isSkinnedMesh) {
        skinnedMesh = object as SkinnedMesh
        const skeleton = skinnedMesh.skeleton

        skeleton.bones.forEach((bone) => {
          bonesRef.current.set(bone.name, bone)

          defaultPosesRef.current.set(bone.name, {
            rotation: bone.rotation.clone(),
            position: {
              x: bone.position.x,
              y: bone.position.y,
              z: bone.position.z,
            },
          })

          const childNames = bone.children
            .filter((c): c is Bone => (c as Bone).isBone)
            .map((c) => c.name)

          bones.set(bone.name, {
            name: bone.name,
            bone: bone,
            parent: bone.parent && (bone.parent as Bone).isBone ? bone.parent.name : null,
            children: childNames,
            defaultRotation: {
              x: bone.rotation.x,
              y: bone.rotation.y,
              z: bone.rotation.z,
            },
            defaultPosition: {
              x: bone.position.x,
              y: bone.position.y,
              z: bone.position.z,
            },
          })

          if (!bone.parent || !(bone.parent as Bone).isBone) {
            rootBone = bone.name
          }
        })
      }
    })

    if (rootBone && bones.size > 0) {
      setBoneHierarchy({
        root: rootBone,
        bones,
        skinnedMesh,
      })

      console.log('=== Bone Hierarchy ===')
      console.log('Root:', rootBone)
      console.log('Total bones:', bones.size)
      console.log('Bone names:', Array.from(bones.keys()))
    }
  }, [scene])

  const applyPose = useCallback((pose: BonePose, immediate: boolean = true) => {
    Object.entries(pose).forEach(([boneName, transform]) => {
      const bone = bonesRef.current.get(boneName)
      if (!bone) {
        console.warn(`Bone not found: ${boneName}`)
        return
      }

      if (transform.rotation) {
        if (immediate) {
          bone.rotation.set(
            transform.rotation.x,
            transform.rotation.y,
            transform.rotation.z
          )
        } else {
          // TODO: Implement interpolated rotation
        }
      }

      if (transform.position) {
        bone.position.set(
          transform.position.x,
          transform.position.y,
          transform.position.z
        )
      }
    })
  }, [])

  const rotateBone = useCallback((
    boneName: string,
    axis: 'x' | 'y' | 'z',
    radians: number,
    relative: boolean = true
  ) => {
    const bone = bonesRef.current.get(boneName)
    if (!bone) return

    if (relative) {
      bone.rotation[axis] += radians
    } else {
      bone.rotation[axis] = radians
    }
  }, [])

  const resetPose = useCallback(() => {
    defaultPosesRef.current.forEach((defaultPose, boneName) => {
      const bone = bonesRef.current.get(boneName)
      if (bone) {
        bone.rotation.copy(defaultPose.rotation)
        bone.position.set(
          defaultPose.position.x,
          defaultPose.position.y,
          defaultPose.position.z
        )
      }
    })
  }, [])

  const getBone = useCallback((name: string): Bone | undefined => {
    return bonesRef.current.get(name)
  }, [])

  const getBoneNames = useCallback((): string[] => {
    return Array.from(bonesRef.current.keys())
  }, [])

  const getBoneWorldPosition = useCallback((boneName: string) => {
    const bone = bonesRef.current.get(boneName)
    if (!bone) return null

    const worldPos = bone.getWorldPosition(new Vector3())
    return { x: worldPos.x, y: worldPos.y, z: worldPos.z }
  }, [])

  return {
    boneHierarchy,
    applyPose,
    rotateBone,
    resetPose,
    getBone,
    getBoneNames,
    getBoneWorldPosition,
  }
}
