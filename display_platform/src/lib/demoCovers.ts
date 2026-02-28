export const DEMO_COVERS = [
  "/demo/06144b47_npschimp-main.png",
  "/demo/57336ce8_slide_01.png",
  "/demo/85db9e55_Slide1%20(1).png",
  "/demo/85db9e55_Slide1.png",
  "/demo/b713cf7b_showcase%20(1).png",
  "/demo/b713cf7b_showcase.png",
  "/demo/dd0962d9_Slide1.png",
  "/demo/fd205dc0_WX20251211-194825_2x.png"
];

export function getDemoCoverByIndex(index: number): string {
  return DEMO_COVERS[index % DEMO_COVERS.length];
}
