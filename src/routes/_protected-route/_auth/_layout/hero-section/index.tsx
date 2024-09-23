import { getHeroSectionControllerGetHeroSectionQueryOptions } from "@/api/endpoints/hero-section/hero-section";
import HeroSectionManagementPage from "@/features/hero-section";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_protected-route/_auth/_layout/hero-section/"
)({
  component: () => <HeroSectionManagementPage />,
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(
      getHeroSectionControllerGetHeroSectionQueryOptions()
    ),
});
