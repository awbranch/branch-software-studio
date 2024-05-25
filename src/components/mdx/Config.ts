import A from "@/components/mdx/A.astro";
import H1 from "@/components/mdx/H1.astro";
import H2 from "@/components/mdx/H2.astro";
import Para from "@/components/mdx/Para.astro";
import UL from "@/components/mdx/UL.astro";
import OL from "@/components/mdx/OL.astro";
import Img from "@/components/mdx/Img.astro";

export const mdxConfig = {
  a: A,
  h1: H1,
  h2: H2,
  p: Para,
  ul: UL,
  ol: OL,
  img: Img,
};
