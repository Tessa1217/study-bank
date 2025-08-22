import { pickDefined, type SbResult } from "@/api/shared/sb-api";
import { userProfilesRepository } from "@/api/repository/profiles.repository";
import type { ProfilesRow, ProfilesUpdate } from '@/api/repository/profiles.repository'

export async function getUserProfile(userId:string):SbResult<Partial<ProfilesRow>> {
  return userProfilesRepository.findById(userId)
}

export async function updateUserProfile(updatePayload:ProfilesUpdate):SbResult<Partial<ProfilesRow>> {
  const payload = pickDefined(updatePayload)
  return userProfilesRepository.update(payload)
}

