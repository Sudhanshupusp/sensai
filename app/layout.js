import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

const inter = Inter({ subsets:["latin"]});

export const metadata = {
  title: "GuruAI - AI carrer Coach",
  description: "Created for a practice",
};

// Add development fallback for Clerk publishable key
const clerkPubKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || 
  (process.env.NODE_ENV === 'development' ? 'pk_test_dummy-key-for-development' : '');

if (!clerkPubKey && process.env.NODE_ENV === 'production') {
  throw new Error("Missing Clerk publishable key");
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider 
      publishableKey={clerkPubKey}
      appearance={{
        baseTheme: dark,
      }}
    >
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className}`}
      >
         <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            { /* header */}
            <Header />
            <main className="min-h-screen">
              {children}
            </main>
            { /* footer */}
            <footer className="bg-muted/50 py-12">
              <div className="container mx-auto px-4 text-center text-gray-200">
                <p>Made by your Friendly neihbourhood spiderman </p>
              </div>
            </footer>
          </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
