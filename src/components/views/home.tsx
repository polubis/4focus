import { AuthProvider, useAuthContext } from "@/context/auth";
import { Button } from "@/components/ui/button";
import { AccordionTrigger } from "@/components/ui/accordion";
import { AccordionItem } from "@/components/ui/accordion";
import { Accordion } from "@/components/ui/accordion";
import { AccordionContent } from "@/components/ui/accordion";
import { navigate } from "astro:transitions/client";

const ADHDAnimation = () => {
  return (
    <div className="absolute flex items-center justify-center w-full h-full overflow-hidden z-[-1]">
      <div className="symbol-1 absolute text-4xl text-black opacity-[0.03] blur-md">
        A
      </div>
      <div className="symbol-2 absolute text-5xl text-black opacity-[0.03] blur-md">
        B
      </div>
      <div className="symbol-3 absolute text-3xl text-black opacity-[0.03] blur-md">
        C
      </div>
      <div className="symbol-4 absolute text-6xl text-black opacity-[0.03] blur-md">
        D
      </div>
      <div className="symbol-5 absolute text-4xl text-black opacity-[0.03] blur-md">
        E
      </div>
      <div className="symbol-6 absolute text-5xl text-black opacity-[0.03] blur-md">
        F
      </div>
      <div className="symbol-7 absolute text-3xl text-black opacity-[0.03] blur-md">
        G
      </div>
      <div className="symbol-8 absolute text-4xl text-black opacity-[0.03] blur-md">
        H
      </div>
      <div className="symbol-9 absolute text-5xl text-black opacity-[0.03] blur-md">
        I
      </div>
      <div className="symbol-10 absolute text-3xl text-black opacity-[0.03] blur-md">
        J
      </div>
      <div className="symbol-11 absolute text-4xl text-black opacity-[0.03] blur-md">
        K
      </div>
      <div className="symbol-12 absolute text-5xl text-black opacity-[0.03] blur-md">
        L
      </div>
      <div className="symbol-13 absolute text-3xl text-black opacity-[0.03] blur-md">
        M
      </div>
      <div className="symbol-14 absolute text-4xl text-black opacity-[0.03] blur-md">
        N
      </div>
      <div className="symbol-15 absolute text-5xl text-black opacity-[0.03] blur-md">
        O
      </div>
      <div className="symbol-16 absolute text-3xl text-black opacity-[0.03] blur-md">
        P
      </div>
      <div className="symbol-17 absolute text-4xl text-black opacity-[0.03] blur-md">
        Q
      </div>
      <div className="symbol-18 absolute text-5xl text-black opacity-[0.03] blur-md">
        R
      </div>
      <div className="symbol-19 absolute text-3xl text-black opacity-[0.03] blur-md">
        S
      </div>
      <div className="symbol-20 absolute text-4xl text-black opacity-[0.03] blur-md">
        T
      </div>
      <div className="symbol-21 absolute text-5xl text-black opacity-[0.03] blur-md">
        U
      </div>
      <div className="symbol-22 absolute text-3xl text-black opacity-[0.03] blur-md">
        V
      </div>
      <div className="symbol-23 absolute text-4xl text-black opacity-[0.03] blur-md">
        W
      </div>
      <div className="symbol-24 absolute text-5xl text-black opacity-[0.03] blur-md">
        X
      </div>
      <div className="symbol-25 absolute text-3xl text-black opacity-[0.03] blur-md">
        Y
      </div>
      <div className="symbol-26 absolute text-4xl text-black opacity-[0.03] blur-md">
        Z
      </div>
      <div className="symbol-27 absolute text-5xl text-black opacity-[0.03] blur-md">
        a
      </div>
      <div className="symbol-28 absolute text-3xl text-black opacity-[0.03] blur-md">
        b
      </div>
      <div className="symbol-29 absolute text-4xl text-black opacity-[0.03] blur-md">
        c
      </div>
      <div className="symbol-30 absolute text-5xl text-black opacity-[0.03] blur-md">
        d
      </div>
      <div className="symbol-31 absolute text-3xl text-black opacity-[0.03] blur-md">
        e
      </div>
      <div className="symbol-32 absolute text-4xl text-black opacity-[0.03] blur-md">
        f
      </div>
      <div className="symbol-33 absolute text-5xl text-black opacity-[0.03] blur-md">
        g
      </div>
      <div className="symbol-34 absolute text-3xl text-black opacity-[0.03] blur-md">
        h
      </div>
      <div className="symbol-35 absolute text-4xl text-black opacity-[0.03] blur-md">
        i
      </div>
      <div className="symbol-36 absolute text-5xl text-black opacity-[0.03] blur-md">
        j
      </div>
      <div className="symbol-37 absolute text-3xl text-black opacity-[0.03] blur-md">
        k
      </div>
      <div className="symbol-38 absolute text-4xl text-black opacity-[0.03] blur-md">
        l
      </div>
      <div className="symbol-39 absolute text-5xl text-black opacity-[0.03] blur-md">
        m
      </div>
      <div className="symbol-40 absolute text-3xl text-black opacity-[0.03] blur-md">
        n
      </div>
      <div className="symbol-41 absolute text-4xl text-black opacity-[0.03] blur-md">
        o
      </div>
      <div className="symbol-42 absolute text-5xl text-black opacity-[0.03] blur-md">
        p
      </div>
      <div className="symbol-43 absolute text-3xl text-black opacity-[0.03] blur-md">
        q
      </div>
      <div className="symbol-44 absolute text-4xl text-black opacity-[0.03] blur-md">
        r
      </div>
      <div className="symbol-45 absolute text-5xl text-black opacity-[0.03] blur-md">
        s
      </div>
      <div className="symbol-46 absolute text-3xl text-black opacity-[0.03] blur-md">
        t
      </div>
      <div className="symbol-47 absolute text-4xl text-black opacity-[0.03] blur-md">
        u
      </div>
      <div className="symbol-48 absolute text-5xl text-black opacity-[0.03] blur-md">
        v
      </div>
      <div className="symbol-49 absolute text-3xl text-black opacity-[0.03] blur-md">
        w
      </div>
      <div className="symbol-50 absolute text-4xl text-black opacity-[0.03] blur-md">
        x
      </div>
      <div className="symbol-51 absolute text-5xl text-black opacity-[0.03] blur-md">
        y
      </div>
      <div className="symbol-52 absolute text-3xl text-black opacity-[0.03] blur-md">
        z
      </div>
      <div className="symbol-53 absolute text-4xl text-black opacity-[0.03] blur-md">
        1
      </div>
      <div className="symbol-54 absolute text-5xl text-black opacity-[0.03] blur-md">
        2
      </div>
      <div className="symbol-55 absolute text-3xl text-black opacity-[0.03] blur-md">
        3
      </div>
      <div className="symbol-56 absolute text-4xl text-black opacity-[0.03] blur-md">
        4
      </div>
      <div className="symbol-57 absolute text-5xl text-black opacity-[0.03] blur-md">
        5
      </div>
      <div className="symbol-58 absolute text-3xl text-black opacity-[0.03] blur-md">
        6
      </div>
      <div className="symbol-59 absolute text-4xl text-black opacity-[0.03] blur-md">
        7
      </div>
      <div className="symbol-60 absolute text-5xl text-black opacity-[0.03] blur-md">
        8
      </div>
    </div>
  );
};

const HomeViewContent = () => {
  const { user } = useAuthContext();

  return (
    <main className="p-4 min-h-screen relative flex items-center justify-center z-10">
      <ADHDAnimation />
      <div className="flex flex-col gap-4 max-w-lg">
        <h1 className="text-3xl md:text-6xl font-bold text-center">
          Fight With ADHD. <br /> Get Things Done!
        </h1>
        <p className="text-center text-lg md:text-2xl">
          Eliminate distractions and <strong>focus on your work</strong>. <br />{" "}
          Only on your work...
        </p>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>What is ADHD?</AccordionTrigger>
            <AccordionContent>
              ADHD (Attention-Deficit/Hyperactivity Disorder) is a
              neurodevelopmental disorder, meaning it originates from
              differences in brain development and function. It's not a lack of
              willpower or a character flaw. ADHD primarily affects the brain's
              executive functions, which include skills like planning,
              organization, time management, working memory, emotional
              regulation, and importantly, attention regulation and impulse
              control. It typically presents with a persistent pattern of
              inattention (difficulty sustaining focus, easily distracted,
              forgetful) and/or hyperactivity-impulsivity (restlessness,
              fidgeting, acting without thinking, interrupting others). ADHD
              exists on a spectrum, affects people across the lifespan (not just
              children), and can manifest differently in each individual.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Why it's so hard to focus?</AccordionTrigger>
            <AccordionContent>
              <p className="mb-2">
                Difficulty focusing with ADHD stems directly from differences in
                brain wiring and neurochemistry, particularly involving
                neurotransmitters like dopamine and norepinephrine which are
                crucial for regulating attention and executive functions. This
                means the ADHD brain struggles with:
              </p>
              <ul className="flex flex-col gap-2">
                <li>
                  <strong>Attention Regulation: </strong>
                  Not necessarily a lack of attention, but difficulty
                  controlling it. It's hard to filter out irrelevant stimuli
                  (internal thoughts or external noises/visuals) and sustain
                  focus on tasks that aren't inherently highly stimulating or
                  novel.
                </li>
                <li>
                  <strong>Interest-Driven Attention: </strong>
                  Focus often depends heavily on interest level. Tasks perceived
                  as boring or requiring sustained mental effort are
                  disproportionately difficult, while highly engaging activities
                  can sometimes lead to intense hyperfocus.
                </li>
                <li>
                  <strong>Working Memory Challenges: </strong> Holding
                  information in mind while performing complex tasks is often
                  harder, making it easy to lose track of steps or forget
                  instructions.
                </li>
                <li>
                  <strong>Executive Function Overload: </strong> Initiating
                  tasks, planning steps, and resisting distractions requires
                  significant mental effort, leading to fatigue and difficulty
                  maintaining focus over time. It's a genuine neurological
                  challenge, not laziness or lack of effort.
                </li>
                <li>
                  <strong>Impulse Control: </strong>
                  Difficulty resisting immediate distractions or impulses,
                  leading to frequent interruptions and difficulty staying on
                  task.
                </li>
                <li>
                  <strong>Executive Function Overload: </strong> Initiating
                  tasks, planning steps, and resisting distractions requires
                  significant mental effort, leading to fatigue and difficulty
                  maintaining focus over time. It's a genuine neurological
                  challenge, not laziness or lack of effort.
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>How this app helps you?</AccordionTrigger>
            <AccordionContent>
              <p className="mb-2">
                Application has been made to block your distractions and help
                you focus on your work. It allows you to only with your tasks to
                achieve the best results. It's using techniques described in{" "}
                <a
                  className="underline"
                  target="_blank"
                  href="https://4markdown.com/how-to-be-productive-as-a-software-engineer/"
                  rel="noreferrer"
                >
                  How to be productive as a software engineer
                </a>
                .
              </p>
              <ul className="flex flex-col gap-2">
                <li>
                  <strong>Simplified, Distraction-Free Interface:</strong> Our
                  clean design minimizes visual clutter (like a black & white
                  approach), removing unnecessary elements so you can
                  concentrate solely on your core tasks without visual noise.
                </li>
                <li>
                  <strong>Track Your Focus & Progress:</strong> Monitor your
                  completed tasks, focused work sessions, and productivity
                  trends over time. Seeing your achievements provides motivation
                  and helps you understand your work patterns.
                </li>
                <li>
                  <strong>Promotes Focused Single-Tasking:</strong> The app
                  encourages tackling tasks sequentially (one by one), helping
                  you avoid the mental fatigue and reduced efficiency that comes
                  from constant context-switching and multitasking.
                </li>
                <li>
                  <strong>Provides Insight into Distraction Patterns:</strong>{" "}
                  Gain awareness when you attempt to navigate away from your
                  task or access blocked sites/apps. This feedback helps you
                  recognize and consciously correct distracting habits over
                  time.
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Button
          className="mt-8"
          onClick={() => navigate(user ? "/tasks" : "/sign-in")}
        >
          Start your ADHD Therapy
        </Button>
      </div>
    </main>
  );
};

export const HomeView = () => {
  return (
    <AuthProvider>
      <HomeViewContent />
    </AuthProvider>
  );
};
