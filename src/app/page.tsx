import { LoginButton } from "@/components/LoginButton";
import { ModeToggle } from "@/components/ModeToggle";

export default async function Page() {
  return (
    <main className="flex flex-col items-center justify-between p-12">
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="text-center">
          <h1 className="text-primary text-4xl font-bold tracking-tight sm:text-6xl">
            Your Spotify listening habits, revealed
          </h1>
          <p className="mt-6 text-lg leading-8 text-primary">
            Effortless Pantry Management for Smart Food Tracking and Worry-Free
            Meal Planning
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <ModeToggle />
            <LoginButton />
          </div>
        </div>
      </div>
    </main>
  );
}
