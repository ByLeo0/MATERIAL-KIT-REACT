'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import { useColorScheme } from '@mui/material/styles';

import { NoSsr } from '@/components/core/no-ssr';

const HEIGHT = 60;
const WIDTH = 60;

type Color = 'dark' | 'light';

export interface LogoProps {
  color?: Color;
  emblem?: boolean;
  height?: number;
  width?: number;
}

export function Logo({
  color = 'dark',
  emblem,
  height = HEIGHT,
  width,
}: {
  color?: 'light' | 'dark';
  emblem?: boolean;
  height?: number | string;
  width?: number | string;
}): React.JSX.Element {
  const url = '/assets/logoQTC.png'; // Imagen que usas

  return (
    <Box
      component="img"
      src={url}
      alt="logo"
      height={height}
      width={width || 'auto'}
      sx={{
        objectFit: 'contain',
        display: 'block',
        maxHeight: '70px', // opcional: limita altura máxima
      }}
    />
  );
}

export interface DynamicLogoProps {
  colorDark?: Color;
  colorLight?: Color;
  emblem?: boolean;
  height?: number;
  width?: number;
}

export function DynamicLogo({
  colorDark = 'light',
  colorLight = 'dark',
  height = HEIGHT,
  width = WIDTH,
  ...props
}: DynamicLogoProps): React.JSX.Element {
  const { colorScheme } = useColorScheme();
  const color = colorScheme === 'dark' ? colorDark : colorLight;

  return (
    <NoSsr fallback={<Box sx={{ height: `${height}px`, width: `${width}px` }} />}>
      <Logo color={color} height={height} width={width} {...props} />
    </NoSsr>
  );
}
