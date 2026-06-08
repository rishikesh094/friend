import Hero from "@/components/sections/Hero";
import Timeline from "@/components/sections/Timeline";
import ReasonsWhy from "@/components/sections/ReasonsWhy";
import MemoryGallery from "@/components/sections/MemoryGallery";
import FriendshipMeter from "@/components/sections/FriendshipMeter";
import SurpriseMessage from "@/components/sections/SurpriseMessage";
import Quiz from "@/components/sections/Quiz";
import FriendshipWall from "@/components/sections/FriendshipWall";
import MusicPlayer from "@/components/sections/MusicPlayer";
import SpecialLetter from "@/components/sections/SpecialLetter";
import Celebration from "@/components/sections/Celebration";
import SecretButton from "@/components/sections/SecretButton";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Timeline />
      <ReasonsWhy />
      <MemoryGallery />
      <FriendshipMeter />
      <SurpriseMessage />
      <Quiz />
      <FriendshipWall />
      <MusicPlayer />
      <SpecialLetter />
      <Celebration />
      <SecretButton />
      <Footer />
    </main>
  );
}
