import configPromise from '@payload-config'
import '@payloadcms/next/css'
import type React from 'react'
import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts'
import type { ServerFunctionClientArgs } from 'payload'
import { importMap } from './importMap'

type Args = {
  children: React.ReactNode
}

export default async function Layout({ children }: Args) {
  const serverFunction = async (args: ServerFunctionClientArgs) => {
    'use server'
    return handleServerFunctions({
      ...args,
      config: configPromise,
      importMap,
    })
  }

  return (
    <RootLayout config={configPromise} importMap={importMap} serverFunction={serverFunction}>
      {children}
    </RootLayout>
  )
}
