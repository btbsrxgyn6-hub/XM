import type { ClassificationTag } from "@/lib/types";

const TAG_KEYS: Record<ClassificationTag, string> = {
  "General Assistant": "generalAssistant",
  "Image generation": "imageGeneration",
  "Video Creation": "videoCreation",
  "Audio Processing": "audioProcessing",
  "Programming Development": "programmingDevelopment",
  "Smart Search": "smartSearch",
  "Knowledge Management": "knowledgeManagement",
  "Writing aids": "writingAids",
  "Smart Hardware": "smartHardware",
  "Virtual companionship": "virtualCompanionship",
  "Agent build": "agentBuild",
  "Efficiency Tools": "efficiencyTools",
  "3D generation": "generation3d",
  "Scientific research assistant": "scientificResearchAssistant",
  "Other types": "otherTypes"
};

export function tagKey(tag: ClassificationTag) {
  return TAG_KEYS[tag];
}
