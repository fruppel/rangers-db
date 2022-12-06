import React, { useCallback } from 'react';
import { Box, Flex, Text, useRadio, useRadioGroup, UseRadioProps } from '@chakra-ui/react';
import { map } from 'lodash';
import { Slots } from '../types/types';

export default function CardCount({ count, marginLeft }: { count: number, marginLeft?: number }) {
  return (
    <Box fontFamily="mono"
      borderRadius="md"
      borderWidth="1px"
      bg="gray.600"
      borderColor="gray.300"
      color="white"
      padding={2}
      marginLeft={marginLeft}
      px={2}
      py={3}
    >
      ×{count}
    </Box>
  );
}

export function RadioCardCount(props: UseRadioProps & { children: React.ReactNode }) {
  const { getInputProps, getCheckboxProps } = useRadio(props);
  const input = getInputProps()
  const checkbox = getCheckboxProps()
  return (
    <Box as='label' marginRight={2}>
      <input {...input} />
      <Box
        {...checkbox}
        cursor='pointer'
        borderWidth='1px'
        borderRadius='md'
        boxShadow='md'
        _checked={{
          bg: 'gray.600',
          color: 'white',
          borderColor: 'gray.600',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        px={4}
        py={3}
        marginBottom={0}
      >
        {props.children}
      </Box>
    </Box>
  );
}


export function RadioCardToggle(props: UseRadioProps & { children: React.ReactNode }) {
  const { getInputProps, getCheckboxProps } = useRadio(props);
  const input = getInputProps()
  const checkbox = getCheckboxProps()
  return (
    <Box as='label' marginBottom={2} padding={0} margin={0}>
      <input {...input} />
      <Box
        {...checkbox}
        cursor='pointer'
        borderWidth='1px'
        borderRadius='md'
        boxShadow='md'
        _checked={{
          bg: 'gray.600',
          color: 'white',
          borderColor: 'gray.600',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        px={3}
        py={2}
        marginBottom={0}
      >
        {props.children}
      </Box>
    </Box>
  );
}

export function CountToggle({ code, slots, setSlots }: { code: string; slots: Slots; setSlots: (code: string, count: number) => void }) {
  const selected = !!slots[code];
  const onToggle = useCallback(() => {
    setSlots(code, selected ? 0 : 2);
  }, [code, setSlots, selected]);
  return (
    <Box
      onClick={onToggle}
      cursor='pointer'
      borderWidth='1px'
      borderRadius='md'
      boxShadow='md'
      bg={selected ? 'gray.600' : undefined}
      color={selected ? 'white' : undefined}
      borderColor={selected ? 'gray.600' : undefined}
      px={3}
      py={2}
    >
      <Text fontSize="xl">{selected ? '–' : '+'}</Text>
    </Box>
  );
}

export function CountControls({ code, slots, setSlots, onClose, countMode }: {
  onClose?: () => void;
  code: string;
  slots: Slots;
  setSlots: (code: string, count: number) => void;
  countMode?: 'noah';
}) {
  const onChange = useCallback((value: string) => {
    if (value === '+') {
      setSlots(code, 2);
    } else if (value === '-') {
      setSlots(code, 0);
    } else {
      setSlots(code, parseInt(value));
    }
    onClose?.();
  }, [code, setSlots, onClose]);
  const currentCount = `${slots[code] || 0}`;

  const { getRadioProps } = useRadioGroup({
    name: 'deck-count',
    defaultValue: currentCount,
    onChange: onChange,
  });
  return (
    <Flex direction="row">
      { map(countMode === 'noah' ? ['0', '2'] : ['0', '1', '2'], value => {
        const radio = getRadioProps({ value });
        return (
          <RadioCardCount key={value} {...radio}>
            {value}
          </RadioCardCount>
        );
      }) }
    </Flex>
  );
}