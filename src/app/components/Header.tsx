"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

function Header() {
    const { user, isSignedIn } = useUser();
    return (
        <div className="flex justify-between shadow-md p-3 px-5">
            <h1 className="font-bold font-sans text-blue-400 text-2xl">
                ONECLICKDRIVE
            </h1>
            {isSignedIn ? (
                <div className="flex gap-2 items-center">
                    <button>
                        <UserButton />
                    </button>
                </div>
            ) : (
               //  <Link href="/sign-in">
               //      <button>Get Started</button>
                        //  </Link>
                        null
            )}
        </div>
    );
}

export default Header;
