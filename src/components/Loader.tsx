import { Loader as MantineLoader } from "@mantine/core";

interface Props {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | number;
}

export default function Loader({ size }: Props) {
  return <MantineLoader size={size} color="cyan" />;
}
