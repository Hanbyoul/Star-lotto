'use client';
import React from 'react';
import { SessionProvider } from 'next-auth/react';

function NextAuthProviders({ children }: { children: React.ReactNode }) {
	return <SessionProvider>{children}</SessionProvider>;
}

export default NextAuthProviders;
