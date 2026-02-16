import { useState } from 'react';

interface MicrocontrollerLabProps {
  onBack: () => void;
}

interface MCU {
  id: string;
  name: string;
  fullName: string;
  color: string;
  voltage: string;
  pins: number;
  speed: string;
  flash: string;
  ram: string;
  features: string[];
  pinout: Pin[];
}

interface Pin {
  number: number;
  name: string;
  type: 'power' | 'ground' | 'digital' | 'analog' | 'pwm' | 'serial' | 'spi' | 'i2c' | 'special';
  description: string;
  side: 'left' | 'right' | 'top' | 'bottom';
}

const microcontrollers: MCU[] = [
  {
    id: 'arduino-uno',
    name: 'Arduino Uno',
    fullName: 'Arduino Uno (ATmega328P)',
    color: '#00979D',
    voltage: '5V',
    pins: 28,
    speed: '16 MHz',
    flash: '32 KB',
    ram: '2 KB',
    features: ['14 Digital I/O', '6 PWM', '6 Analog Inputs', 'USB', 'UART', 'SPI', 'I2C'],
    pinout: [
      { number: 1, name: 'D0/RX', type: 'serial', description: 'Digital Pin 0 / UART Receive', side: 'right' },
      { number: 2, name: 'D1/TX', type: 'serial', description: 'Digital Pin 1 / UART Transmit', side: 'right' },
      { number: 3, name: 'D2', type: 'digital', description: 'Digital Pin 2 / INT0', side: 'right' },
      { number: 4, name: 'D3~', type: 'pwm', description: 'Digital Pin 3 / PWM / INT1', side: 'right' },
      { number: 5, name: 'D4', type: 'digital', description: 'Digital Pin 4', side: 'right' },
      { number: 6, name: 'D5~', type: 'pwm', description: 'Digital Pin 5 / PWM', side: 'right' },
      { number: 7, name: 'D6~', type: 'pwm', description: 'Digital Pin 6 / PWM', side: 'right' },
      { number: 8, name: 'D7', type: 'digital', description: 'Digital Pin 7', side: 'right' },
      { number: 9, name: 'D8', type: 'digital', description: 'Digital Pin 8', side: 'right' },
      { number: 10, name: 'D9~', type: 'pwm', description: 'Digital Pin 9 / PWM', side: 'right' },
      { number: 11, name: 'D10~', type: 'pwm', description: 'Digital Pin 10 / PWM / SS', side: 'right' },
      { number: 12, name: 'D11~', type: 'pwm', description: 'Digital Pin 11 / PWM / MOSI', side: 'right' },
      { number: 13, name: 'D12', type: 'spi', description: 'Digital Pin 12 / MISO', side: 'right' },
      { number: 14, name: 'D13', type: 'spi', description: 'Digital Pin 13 / SCK / LED', side: 'right' },
      { number: 15, name: 'A0', type: 'analog', description: 'Analog Input 0', side: 'left' },
      { number: 16, name: 'A1', type: 'analog', description: 'Analog Input 1', side: 'left' },
      { number: 17, name: 'A2', type: 'analog', description: 'Analog Input 2', side: 'left' },
      { number: 18, name: 'A3', type: 'analog', description: 'Analog Input 3', side: 'left' },
      { number: 19, name: 'A4/SDA', type: 'i2c', description: 'Analog Input 4 / I2C Data', side: 'left' },
      { number: 20, name: 'A5/SCL', type: 'i2c', description: 'Analog Input 5 / I2C Clock', side: 'left' },
      { number: 21, name: 'VIN', type: 'power', description: 'Input Voltage (7-12V)', side: 'left' },
      { number: 22, name: 'GND', type: 'ground', description: 'Ground', side: 'left' },
      { number: 23, name: '5V', type: 'power', description: '5V Output', side: 'left' },
      { number: 24, name: '3.3V', type: 'power', description: '3.3V Output (50mA max)', side: 'left' },
      { number: 25, name: 'RESET', type: 'special', description: 'Reset Pin', side: 'left' },
    ]
  },
  {
    id: 'esp32',
    name: 'ESP32',
    fullName: 'ESP32-WROOM-32',
    color: '#E7352C',
    voltage: '3.3V',
    pins: 38,
    speed: '240 MHz',
    flash: '4 MB',
    ram: '520 KB',
    features: ['WiFi', 'Bluetooth', '34 GPIO', '18 ADC', '2 DAC', 'Touch Sensors', 'Hall Sensor'],
    pinout: [
      { number: 1, name: 'EN', type: 'special', description: 'Enable / Reset', side: 'left' },
      { number: 2, name: 'VP/GPIO36', type: 'analog', description: 'ADC1_CH0 (Input Only)', side: 'left' },
      { number: 3, name: 'VN/GPIO39', type: 'analog', description: 'ADC1_CH3 (Input Only)', side: 'left' },
      { number: 4, name: 'GPIO34', type: 'analog', description: 'ADC1_CH6 (Input Only)', side: 'left' },
      { number: 5, name: 'GPIO35', type: 'analog', description: 'ADC1_CH7 (Input Only)', side: 'left' },
      { number: 6, name: 'GPIO32', type: 'analog', description: 'ADC1_CH4 / Touch9', side: 'left' },
      { number: 7, name: 'GPIO33', type: 'analog', description: 'ADC1_CH5 / Touch8', side: 'left' },
      { number: 8, name: 'GPIO25', type: 'pwm', description: 'DAC1 / ADC2_CH8', side: 'left' },
      { number: 9, name: 'GPIO26', type: 'pwm', description: 'DAC2 / ADC2_CH9', side: 'left' },
      { number: 10, name: 'GPIO27', type: 'digital', description: 'ADC2_CH7 / Touch7', side: 'left' },
      { number: 11, name: 'GPIO14', type: 'digital', description: 'ADC2_CH6 / Touch6', side: 'left' },
      { number: 12, name: 'GPIO12', type: 'digital', description: 'ADC2_CH5 / Touch5', side: 'left' },
      { number: 13, name: 'GND', type: 'ground', description: 'Ground', side: 'left' },
      { number: 14, name: 'GPIO13', type: 'digital', description: 'ADC2_CH4 / Touch4', side: 'left' },
      { number: 15, name: 'GPIO9', type: 'spi', description: 'Flash D2 (Don\'t Use)', side: 'left' },
      { number: 16, name: 'GPIO10', type: 'spi', description: 'Flash D3 (Don\'t Use)', side: 'left' },
      { number: 17, name: 'GPIO11', type: 'spi', description: 'Flash CMD (Don\'t Use)', side: 'left' },
      { number: 18, name: '3V3', type: 'power', description: '3.3V Power', side: 'right' },
      { number: 19, name: 'GPIO23', type: 'spi', description: 'VSPI MOSI', side: 'right' },
      { number: 20, name: 'GPIO22', type: 'i2c', description: 'I2C SCL', side: 'right' },
      { number: 21, name: 'GPIO1/TX', type: 'serial', description: 'UART0 TX', side: 'right' },
      { number: 22, name: 'GPIO3/RX', type: 'serial', description: 'UART0 RX', side: 'right' },
      { number: 23, name: 'GPIO21', type: 'i2c', description: 'I2C SDA', side: 'right' },
      { number: 24, name: 'GND', type: 'ground', description: 'Ground', side: 'right' },
      { number: 25, name: 'GPIO19', type: 'spi', description: 'VSPI MISO', side: 'right' },
      { number: 26, name: 'GPIO18', type: 'spi', description: 'VSPI CLK', side: 'right' },
      { number: 27, name: 'GPIO5', type: 'pwm', description: 'VSPI SS / Strapping', side: 'right' },
      { number: 28, name: 'GPIO17', type: 'serial', description: 'UART2 TX', side: 'right' },
      { number: 29, name: 'GPIO16', type: 'serial', description: 'UART2 RX', side: 'right' },
      { number: 30, name: 'GPIO4', type: 'analog', description: 'ADC2_CH0 / Touch0', side: 'right' },
      { number: 31, name: 'GPIO0', type: 'special', description: 'Boot / ADC2_CH1', side: 'right' },
      { number: 32, name: 'GPIO2', type: 'digital', description: 'ADC2_CH2 / LED', side: 'right' },
      { number: 33, name: 'GPIO15', type: 'digital', description: 'ADC2_CH3 / Touch3', side: 'right' },
      { number: 34, name: 'VIN', type: 'power', description: '5V Input', side: 'right' },
    ]
  },
  {
    id: 'esp8266',
    name: 'ESP8266',
    fullName: 'NodeMCU ESP8266',
    color: '#F7DF1E',
    voltage: '3.3V',
    pins: 30,
    speed: '80 MHz',
    flash: '4 MB',
    ram: '80 KB',
    features: ['WiFi', '17 GPIO', '1 ADC', 'PWM', 'I2C', 'SPI', 'UART'],
    pinout: [
      { number: 1, name: 'VIN', type: 'power', description: '5V Input', side: 'left' },
      { number: 2, name: 'GND', type: 'ground', description: 'Ground', side: 'left' },
      { number: 3, name: 'RST', type: 'special', description: 'Reset', side: 'left' },
      { number: 4, name: 'EN', type: 'special', description: 'Chip Enable', side: 'left' },
      { number: 5, name: '3V3', type: 'power', description: '3.3V Output', side: 'left' },
      { number: 6, name: 'GND', type: 'ground', description: 'Ground', side: 'left' },
      { number: 7, name: 'CLK', type: 'spi', description: 'SPI Clock', side: 'left' },
      { number: 8, name: 'SD0', type: 'spi', description: 'SPI MISO', side: 'left' },
      { number: 9, name: 'CMD', type: 'spi', description: 'SPI CS', side: 'left' },
      { number: 10, name: 'SD1', type: 'spi', description: 'SPI MOSI', side: 'left' },
      { number: 11, name: 'SD2', type: 'digital', description: 'GPIO9', side: 'left' },
      { number: 12, name: 'SD3', type: 'digital', description: 'GPIO10', side: 'left' },
      { number: 13, name: 'RSV', type: 'special', description: 'Reserved', side: 'left' },
      { number: 14, name: 'A0', type: 'analog', description: 'Analog Input', side: 'right' },
      { number: 15, name: 'D0/GPIO16', type: 'digital', description: 'GPIO16 / Wake', side: 'right' },
      { number: 16, name: 'D1/GPIO5', type: 'i2c', description: 'GPIO5 / SCL', side: 'right' },
      { number: 17, name: 'D2/GPIO4', type: 'i2c', description: 'GPIO4 / SDA', side: 'right' },
      { number: 18, name: 'D3/GPIO0', type: 'special', description: 'GPIO0 / Flash', side: 'right' },
      { number: 19, name: 'D4/GPIO2', type: 'digital', description: 'GPIO2 / LED', side: 'right' },
      { number: 20, name: '3V3', type: 'power', description: '3.3V Output', side: 'right' },
      { number: 21, name: 'GND', type: 'ground', description: 'Ground', side: 'right' },
      { number: 22, name: 'D5/GPIO14', type: 'spi', description: 'GPIO14 / SCLK', side: 'right' },
      { number: 23, name: 'D6/GPIO12', type: 'spi', description: 'GPIO12 / MISO', side: 'right' },
      { number: 24, name: 'D7/GPIO13', type: 'spi', description: 'GPIO13 / MOSI', side: 'right' },
      { number: 25, name: 'D8/GPIO15', type: 'spi', description: 'GPIO15 / CS', side: 'right' },
      { number: 26, name: 'RX', type: 'serial', description: 'UART RX', side: 'right' },
      { number: 27, name: 'TX', type: 'serial', description: 'UART TX', side: 'right' },
      { number: 28, name: 'GND', type: 'ground', description: 'Ground', side: 'right' },
      { number: 29, name: '3V3', type: 'power', description: '3.3V Output', side: 'right' },
    ]
  },
  {
    id: 'stm32',
    name: 'STM32F103',
    fullName: 'STM32F103C8T6 (Blue Pill)',
    color: '#03234B',
    voltage: '3.3V',
    pins: 40,
    speed: '72 MHz',
    flash: '64 KB',
    ram: '20 KB',
    features: ['ARM Cortex-M3', '37 GPIO', '10 ADC', '7 Timers', 'USB', 'CAN', 'RTC'],
    pinout: [
      { number: 1, name: 'VBAT', type: 'power', description: 'Battery Backup', side: 'left' },
      { number: 2, name: 'PC13', type: 'digital', description: 'GPIO / LED', side: 'left' },
      { number: 3, name: 'PC14', type: 'special', description: 'OSC32_IN', side: 'left' },
      { number: 4, name: 'PC15', type: 'special', description: 'OSC32_OUT', side: 'left' },
      { number: 5, name: 'PA0', type: 'analog', description: 'ADC_IN0 / WKUP', side: 'left' },
      { number: 6, name: 'PA1', type: 'analog', description: 'ADC_IN1', side: 'left' },
      { number: 7, name: 'PA2', type: 'serial', description: 'ADC_IN2 / USART2_TX', side: 'left' },
      { number: 8, name: 'PA3', type: 'serial', description: 'ADC_IN3 / USART2_RX', side: 'left' },
      { number: 9, name: 'PA4', type: 'analog', description: 'ADC_IN4 / SPI1_NSS', side: 'left' },
      { number: 10, name: 'PA5', type: 'spi', description: 'ADC_IN5 / SPI1_SCK', side: 'left' },
      { number: 11, name: 'PA6', type: 'spi', description: 'ADC_IN6 / SPI1_MISO', side: 'left' },
      { number: 12, name: 'PA7', type: 'spi', description: 'ADC_IN7 / SPI1_MOSI', side: 'left' },
      { number: 13, name: 'PB0', type: 'analog', description: 'ADC_IN8', side: 'left' },
      { number: 14, name: 'PB1', type: 'analog', description: 'ADC_IN9', side: 'left' },
      { number: 15, name: 'PB10', type: 'i2c', description: 'I2C2_SCL / USART3_TX', side: 'left' },
      { number: 16, name: 'PB11', type: 'i2c', description: 'I2C2_SDA / USART3_RX', side: 'left' },
      { number: 17, name: 'NRST', type: 'special', description: 'Reset', side: 'right' },
      { number: 18, name: '3V3', type: 'power', description: '3.3V Power', side: 'right' },
      { number: 19, name: 'GND', type: 'ground', description: 'Ground', side: 'right' },
      { number: 20, name: 'PA9', type: 'serial', description: 'USART1_TX', side: 'right' },
      { number: 21, name: 'PA10', type: 'serial', description: 'USART1_RX', side: 'right' },
      { number: 22, name: 'PA11', type: 'special', description: 'USB_DM / CAN_RX', side: 'right' },
      { number: 23, name: 'PA12', type: 'special', description: 'USB_DP / CAN_TX', side: 'right' },
      { number: 24, name: 'PA15', type: 'digital', description: 'JTDI / SPI3_NSS', side: 'right' },
      { number: 25, name: 'PB3', type: 'spi', description: 'JTDO / SPI3_SCK', side: 'right' },
      { number: 26, name: 'PB4', type: 'spi', description: 'NJTRST / SPI3_MISO', side: 'right' },
      { number: 27, name: 'PB5', type: 'spi', description: 'I2C1_SMBA / SPI3_MOSI', side: 'right' },
      { number: 28, name: 'PB6', type: 'i2c', description: 'I2C1_SCL / USART1_TX', side: 'right' },
      { number: 29, name: 'PB7', type: 'i2c', description: 'I2C1_SDA / USART1_RX', side: 'right' },
      { number: 30, name: 'PB8', type: 'pwm', description: 'TIM4_CH3 / I2C1_SCL', side: 'right' },
      { number: 31, name: 'PB9', type: 'pwm', description: 'TIM4_CH4 / I2C1_SDA', side: 'right' },
      { number: 32, name: '5V', type: 'power', description: '5V Input', side: 'right' },
      { number: 33, name: 'GND', type: 'ground', description: 'Ground', side: 'right' },
      { number: 34, name: '3V3', type: 'power', description: '3.3V Power', side: 'right' },
    ]
  },
  {
    id: 'pico',
    name: 'Raspberry Pi Pico',
    fullName: 'Raspberry Pi Pico (RP2040)',
    color: '#C51A4A',
    voltage: '3.3V',
    pins: 40,
    speed: '133 MHz',
    flash: '2 MB',
    ram: '264 KB',
    features: ['Dual Core ARM Cortex-M0+', '26 GPIO', '3 ADC', 'PIO', 'USB', '2x SPI', '2x I2C', '2x UART'],
    pinout: [
      { number: 1, name: 'GP0', type: 'serial', description: 'GPIO0 / UART0_TX', side: 'left' },
      { number: 2, name: 'GP1', type: 'serial', description: 'GPIO1 / UART0_RX', side: 'left' },
      { number: 3, name: 'GND', type: 'ground', description: 'Ground', side: 'left' },
      { number: 4, name: 'GP2', type: 'i2c', description: 'GPIO2 / I2C1_SDA', side: 'left' },
      { number: 5, name: 'GP3', type: 'i2c', description: 'GPIO3 / I2C1_SCL', side: 'left' },
      { number: 6, name: 'GP4', type: 'spi', description: 'GPIO4 / SPI0_RX', side: 'left' },
      { number: 7, name: 'GP5', type: 'spi', description: 'GPIO5 / SPI0_CSn', side: 'left' },
      { number: 8, name: 'GND', type: 'ground', description: 'Ground', side: 'left' },
      { number: 9, name: 'GP6', type: 'spi', description: 'GPIO6 / SPI0_SCK', side: 'left' },
      { number: 10, name: 'GP7', type: 'spi', description: 'GPIO7 / SPI0_TX', side: 'left' },
      { number: 11, name: 'GP8', type: 'serial', description: 'GPIO8 / UART1_TX', side: 'left' },
      { number: 12, name: 'GP9', type: 'serial', description: 'GPIO9 / UART1_RX', side: 'left' },
      { number: 13, name: 'GND', type: 'ground', description: 'Ground', side: 'left' },
      { number: 14, name: 'GP10', type: 'digital', description: 'GPIO10 / SPI1_SCK', side: 'left' },
      { number: 15, name: 'GP11', type: 'digital', description: 'GPIO11 / SPI1_TX', side: 'left' },
      { number: 16, name: 'GP12', type: 'digital', description: 'GPIO12 / SPI1_RX', side: 'left' },
      { number: 17, name: 'GP13', type: 'digital', description: 'GPIO13 / SPI1_CSn', side: 'left' },
      { number: 18, name: 'GND', type: 'ground', description: 'Ground', side: 'left' },
      { number: 19, name: 'GP14', type: 'i2c', description: 'GPIO14 / I2C1_SDA', side: 'left' },
      { number: 20, name: 'GP15', type: 'i2c', description: 'GPIO15 / I2C1_SCL', side: 'left' },
      { number: 21, name: 'GP16', type: 'spi', description: 'GPIO16 / SPI0_RX', side: 'right' },
      { number: 22, name: 'GP17', type: 'spi', description: 'GPIO17 / SPI0_CSn', side: 'right' },
      { number: 23, name: 'GND', type: 'ground', description: 'Ground', side: 'right' },
      { number: 24, name: 'GP18', type: 'spi', description: 'GPIO18 / SPI0_SCK', side: 'right' },
      { number: 25, name: 'GP19', type: 'spi', description: 'GPIO19 / SPI0_TX', side: 'right' },
      { number: 26, name: 'GP20', type: 'i2c', description: 'GPIO20 / I2C0_SDA', side: 'right' },
      { number: 27, name: 'GP21', type: 'i2c', description: 'GPIO21 / I2C0_SCL', side: 'right' },
      { number: 28, name: 'GND', type: 'ground', description: 'Ground', side: 'right' },
      { number: 29, name: 'GP22', type: 'digital', description: 'GPIO22', side: 'right' },
      { number: 30, name: 'RUN', type: 'special', description: 'Reset (active low)', side: 'right' },
      { number: 31, name: 'GP26/A0', type: 'analog', description: 'GPIO26 / ADC0', side: 'right' },
      { number: 32, name: 'GP27/A1', type: 'analog', description: 'GPIO27 / ADC1', side: 'right' },
      { number: 33, name: 'GND', type: 'ground', description: 'Ground', side: 'right' },
      { number: 34, name: 'GP28/A2', type: 'analog', description: 'GPIO28 / ADC2', side: 'right' },
      { number: 35, name: 'ADC_VREF', type: 'power', description: 'ADC Reference', side: 'right' },
      { number: 36, name: '3V3', type: 'power', description: '3.3V Output', side: 'right' },
      { number: 37, name: '3V3_EN', type: 'special', description: '3.3V Enable', side: 'right' },
      { number: 38, name: 'GND', type: 'ground', description: 'Ground', side: 'right' },
      { number: 39, name: 'VSYS', type: 'power', description: 'System Power (1.8-5.5V)', side: 'right' },
      { number: 40, name: 'VBUS', type: 'power', description: 'USB Power (5V)', side: 'right' },
    ]
  },
  {
    id: 'attiny85',
    name: 'ATtiny85',
    fullName: 'ATtiny85 (Digispark)',
    color: '#FF6B35',
    voltage: '5V',
    pins: 8,
    speed: '16.5 MHz',
    flash: '8 KB',
    ram: '512 B',
    features: ['6 GPIO', '4 ADC', '3 PWM', 'USI (I2C/SPI)', 'USB'],
    pinout: [
      { number: 1, name: 'PB5/RST', type: 'special', description: 'Reset / ADC0', side: 'left' },
      { number: 2, name: 'PB3', type: 'analog', description: 'ADC3 / USB+', side: 'left' },
      { number: 3, name: 'PB4', type: 'analog', description: 'ADC2 / USB-', side: 'left' },
      { number: 4, name: 'GND', type: 'ground', description: 'Ground', side: 'left' },
      { number: 5, name: 'PB0', type: 'pwm', description: 'MOSI / PWM / SDA', side: 'right' },
      { number: 6, name: 'PB1', type: 'pwm', description: 'MISO / PWM', side: 'right' },
      { number: 7, name: 'PB2', type: 'i2c', description: 'SCK / SCL / ADC1', side: 'right' },
      { number: 8, name: 'VCC', type: 'power', description: '5V Power', side: 'right' },
    ]
  },
  {
    id: 'arduino-nano',
    name: 'Arduino Nano',
    fullName: 'Arduino Nano (ATmega328P)',
    color: '#00979D',
    voltage: '5V',
    pins: 30,
    speed: '16 MHz',
    flash: '32 KB',
    ram: '2 KB',
    features: ['14 Digital I/O', '6 PWM', '8 Analog Inputs', 'Mini-USB', 'UART', 'SPI', 'I2C'],
    pinout: [
      { number: 1, name: 'D1/TX', type: 'serial', description: 'Digital Pin 1 / UART TX', side: 'left' },
      { number: 2, name: 'D0/RX', type: 'serial', description: 'Digital Pin 0 / UART RX', side: 'left' },
      { number: 3, name: 'RST', type: 'special', description: 'Reset', side: 'left' },
      { number: 4, name: 'GND', type: 'ground', description: 'Ground', side: 'left' },
      { number: 5, name: 'D2', type: 'digital', description: 'Digital Pin 2 / INT0', side: 'left' },
      { number: 6, name: 'D3~', type: 'pwm', description: 'Digital Pin 3 / PWM / INT1', side: 'left' },
      { number: 7, name: 'D4', type: 'digital', description: 'Digital Pin 4', side: 'left' },
      { number: 8, name: 'D5~', type: 'pwm', description: 'Digital Pin 5 / PWM', side: 'left' },
      { number: 9, name: 'D6~', type: 'pwm', description: 'Digital Pin 6 / PWM', side: 'left' },
      { number: 10, name: 'D7', type: 'digital', description: 'Digital Pin 7', side: 'left' },
      { number: 11, name: 'D8', type: 'digital', description: 'Digital Pin 8', side: 'left' },
      { number: 12, name: 'D9~', type: 'pwm', description: 'Digital Pin 9 / PWM', side: 'left' },
      { number: 13, name: 'D10~', type: 'pwm', description: 'Digital Pin 10 / PWM / SS', side: 'left' },
      { number: 14, name: 'D11~', type: 'pwm', description: 'Digital Pin 11 / PWM / MOSI', side: 'left' },
      { number: 15, name: 'D12', type: 'spi', description: 'Digital Pin 12 / MISO', side: 'left' },
      { number: 16, name: 'VIN', type: 'power', description: 'Input Voltage (7-12V)', side: 'right' },
      { number: 17, name: 'GND', type: 'ground', description: 'Ground', side: 'right' },
      { number: 18, name: 'RST', type: 'special', description: 'Reset', side: 'right' },
      { number: 19, name: '5V', type: 'power', description: '5V Output', side: 'right' },
      { number: 20, name: 'A7', type: 'analog', description: 'Analog Input 7', side: 'right' },
      { number: 21, name: 'A6', type: 'analog', description: 'Analog Input 6', side: 'right' },
      { number: 22, name: 'A5/SCL', type: 'i2c', description: 'Analog Input 5 / I2C Clock', side: 'right' },
      { number: 23, name: 'A4/SDA', type: 'i2c', description: 'Analog Input 4 / I2C Data', side: 'right' },
      { number: 24, name: 'A3', type: 'analog', description: 'Analog Input 3', side: 'right' },
      { number: 25, name: 'A2', type: 'analog', description: 'Analog Input 2', side: 'right' },
      { number: 26, name: 'A1', type: 'analog', description: 'Analog Input 1', side: 'right' },
      { number: 27, name: 'A0', type: 'analog', description: 'Analog Input 0', side: 'right' },
      { number: 28, name: 'AREF', type: 'special', description: 'Analog Reference', side: 'right' },
      { number: 29, name: '3V3', type: 'power', description: '3.3V Output', side: 'right' },
      { number: 30, name: 'D13', type: 'spi', description: 'Digital Pin 13 / SCK / LED', side: 'right' },
    ]
  },
  {
    id: 'arduino-mega',
    name: 'Arduino Mega',
    fullName: 'Arduino Mega 2560 (ATmega2560)',
    color: '#00979D',
    voltage: '5V',
    pins: 70,
    speed: '16 MHz',
    flash: '256 KB',
    ram: '8 KB',
    features: ['54 Digital I/O', '15 PWM', '16 Analog Inputs', '4 UART', 'USB', 'SPI', 'I2C'],
    pinout: [
      { number: 1, name: 'D0/RX0', type: 'serial', description: 'UART0 RX', side: 'left' },
      { number: 2, name: 'D1/TX0', type: 'serial', description: 'UART0 TX', side: 'left' },
      { number: 3, name: 'D2~', type: 'pwm', description: 'PWM / INT4', side: 'left' },
      { number: 4, name: 'D3~', type: 'pwm', description: 'PWM / INT5', side: 'left' },
      { number: 5, name: 'D4~', type: 'pwm', description: 'PWM', side: 'left' },
      { number: 6, name: 'D5~', type: 'pwm', description: 'PWM', side: 'left' },
      { number: 7, name: 'D6~', type: 'pwm', description: 'PWM', side: 'left' },
      { number: 8, name: 'D7~', type: 'pwm', description: 'PWM', side: 'left' },
      { number: 9, name: 'D8~', type: 'pwm', description: 'PWM', side: 'left' },
      { number: 10, name: 'D9~', type: 'pwm', description: 'PWM', side: 'left' },
      { number: 11, name: 'D10~', type: 'pwm', description: 'PWM', side: 'left' },
      { number: 12, name: 'D11~', type: 'pwm', description: 'PWM', side: 'left' },
      { number: 13, name: 'D12~', type: 'pwm', description: 'PWM', side: 'left' },
      { number: 14, name: 'D13~', type: 'pwm', description: 'PWM / LED', side: 'left' },
      { number: 15, name: 'D14/TX3', type: 'serial', description: 'UART3 TX', side: 'left' },
      { number: 16, name: 'D15/RX3', type: 'serial', description: 'UART3 RX', side: 'left' },
      { number: 17, name: 'D16/TX2', type: 'serial', description: 'UART2 TX', side: 'right' },
      { number: 18, name: 'D17/RX2', type: 'serial', description: 'UART2 RX', side: 'right' },
      { number: 19, name: 'D18/TX1', type: 'serial', description: 'UART1 TX / INT3', side: 'right' },
      { number: 20, name: 'D19/RX1', type: 'serial', description: 'UART1 RX / INT2', side: 'right' },
      { number: 21, name: 'D20/SDA', type: 'i2c', description: 'I2C Data / INT1', side: 'right' },
      { number: 22, name: 'D21/SCL', type: 'i2c', description: 'I2C Clock / INT0', side: 'right' },
      { number: 23, name: 'A0', type: 'analog', description: 'Analog Input 0', side: 'right' },
      { number: 24, name: 'A1', type: 'analog', description: 'Analog Input 1', side: 'right' },
      { number: 25, name: 'A2', type: 'analog', description: 'Analog Input 2', side: 'right' },
      { number: 26, name: 'A3', type: 'analog', description: 'Analog Input 3', side: 'right' },
      { number: 27, name: 'A4', type: 'analog', description: 'Analog Input 4', side: 'right' },
      { number: 28, name: 'A5', type: 'analog', description: 'Analog Input 5', side: 'right' },
      { number: 29, name: 'D50/MISO', type: 'spi', description: 'SPI MISO', side: 'right' },
      { number: 30, name: 'D51/MOSI', type: 'spi', description: 'SPI MOSI', side: 'right' },
      { number: 31, name: 'D52/SCK', type: 'spi', description: 'SPI Clock', side: 'right' },
      { number: 32, name: 'D53/SS', type: 'spi', description: 'SPI Select', side: 'right' },
    ]
  },
];

const pinTypeColors: Record<string, { bg: string; text: string; border: string }> = {
  power: { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500' },
  ground: { bg: 'bg-gray-500/20', text: 'text-gray-400', border: 'border-gray-500' },
  digital: { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500' },
  analog: { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500' },
  pwm: { bg: 'bg-yellow-500/20', text: 'text-yellow-400', border: 'border-yellow-500' },
  serial: { bg: 'bg-purple-500/20', text: 'text-purple-400', border: 'border-purple-500' },
  spi: { bg: 'bg-cyan-500/20', text: 'text-cyan-400', border: 'border-cyan-500' },
  i2c: { bg: 'bg-orange-500/20', text: 'text-orange-400', border: 'border-orange-500' },
  special: { bg: 'bg-pink-500/20', text: 'text-pink-400', border: 'border-pink-500' },
};

export default function MicrocontrollerLab({ onBack }: MicrocontrollerLabProps) {
  const [selectedMCU, setSelectedMCU] = useState<MCU>(microcontrollers[0]);
  const [hoveredPin, setHoveredPin] = useState<Pin | null>(null);
  const [gpioStates, setGpioStates] = useState<Record<string, boolean>>({});
  const [connectedDevice, setConnectedDevice] = useState<string>('led');
  const [selectedPin, setSelectedPin] = useState<Pin | null>(null);

  const toggleGpio = (pinName: string) => {
    setGpioStates(prev => ({ ...prev, [pinName]: !prev[pinName] }));
  };

  const leftPins = selectedMCU.pinout.filter(p => p.side === 'left');
  const rightPins = selectedMCU.pinout.filter(p => p.side === 'right');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 text-white">
      {/* Header */}
      <header className="bg-black/40 border-b border-gray-700/50 py-4">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
            >
              ← Back
            </button>
            <div>
              <h1 className="text-xl font-bold text-orange-400">🎛️ Microcontroller Lab</h1>
              <p className="text-gray-500 text-xs">Interactive pin diagrams & GPIO simulation</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* MCU Selection */}
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-gray-400 mb-3">Select Microcontroller</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
            {microcontrollers.map((mcu) => (
              <button
                key={mcu.id}
                onClick={() => {
                  setSelectedMCU(mcu);
                  setSelectedPin(null);
                  setGpioStates({});
                }}
                className={`p-3 rounded-lg border transition-all text-left ${
                  selectedMCU.id === mcu.id
                    ? 'border-orange-500 bg-orange-500/10 shadow-lg shadow-orange-500/20'
                    : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                }`}
              >
                <div
                  className="w-3 h-3 rounded-full mb-2"
                  style={{ backgroundColor: mcu.color }}
                />
                <p className="text-xs font-semibold text-white">{mcu.name}</p>
                <p className="text-[10px] text-gray-500">{mcu.pins} pins</p>
              </button>
            ))}
          </div>
        </section>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Pin Diagram */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-white">{selectedMCU.fullName}</h2>
                <div className="flex gap-2">
                  <span className="px-2 py-0.5 bg-gray-700 rounded text-xs text-gray-300">{selectedMCU.voltage}</span>
                  <span className="px-2 py-0.5 bg-gray-700 rounded text-xs text-gray-300">{selectedMCU.speed}</span>
                </div>
              </div>

              {/* MCU Visual */}
              <div className="flex justify-center items-center gap-2 py-4">
                {/* Left Pins */}
                <div className="flex flex-col gap-1">
                  {leftPins.map((pin) => {
                    const colors = pinTypeColors[pin.type];
                    const isActive = gpioStates[pin.name];
                    return (
                      <div
                        key={pin.number}
                        className={`flex items-center gap-1 cursor-pointer transition-all ${
                          hoveredPin?.number === pin.number ? 'scale-105' : ''
                        }`}
                        onMouseEnter={() => setHoveredPin(pin)}
                        onMouseLeave={() => setHoveredPin(null)}
                        onClick={() => {
                          setSelectedPin(pin);
                          if (pin.type === 'digital' || pin.type === 'pwm') {
                            toggleGpio(pin.name);
                          }
                        }}
                      >
                        <span className={`text-[9px] w-16 text-right truncate ${colors.text}`}>
                          {pin.name}
                        </span>
                        <div
                          className={`w-8 h-4 rounded-sm border ${colors.border} ${colors.bg} flex items-center justify-center transition-all ${
                            isActive ? 'shadow-lg' : ''
                          }`}
                          style={isActive ? { boxShadow: `0 0 8px ${colors.border.replace('border-', '')}` } : {}}
                        >
                          <span className="text-[8px] text-gray-400">{pin.number}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* MCU Body */}
                <div
                  className="w-32 rounded-lg border-2 flex flex-col items-center justify-center py-6"
                  style={{ borderColor: selectedMCU.color, backgroundColor: `${selectedMCU.color}20` }}
                >
                  <div
                    className="w-6 h-6 rounded-full mb-2"
                    style={{ backgroundColor: selectedMCU.color }}
                  />
                  <span className="text-xs font-bold text-white text-center px-2">{selectedMCU.name}</span>
                  <span className="text-[10px] text-gray-400 mt-1">{selectedMCU.flash} Flash</span>
                  <span className="text-[10px] text-gray-400">{selectedMCU.ram} RAM</span>
                </div>

                {/* Right Pins */}
                <div className="flex flex-col gap-1">
                  {rightPins.map((pin) => {
                    const colors = pinTypeColors[pin.type];
                    const isActive = gpioStates[pin.name];
                    return (
                      <div
                        key={pin.number}
                        className={`flex items-center gap-1 cursor-pointer transition-all ${
                          hoveredPin?.number === pin.number ? 'scale-105' : ''
                        }`}
                        onMouseEnter={() => setHoveredPin(pin)}
                        onMouseLeave={() => setHoveredPin(null)}
                        onClick={() => {
                          setSelectedPin(pin);
                          if (pin.type === 'digital' || pin.type === 'pwm') {
                            toggleGpio(pin.name);
                          }
                        }}
                      >
                        <div
                          className={`w-8 h-4 rounded-sm border ${colors.border} ${colors.bg} flex items-center justify-center transition-all ${
                            isActive ? 'shadow-lg' : ''
                          }`}
                          style={isActive ? { boxShadow: `0 0 8px ${colors.border.replace('border-', '')}` } : {}}
                        >
                          <span className="text-[8px] text-gray-400">{pin.number}</span>
                        </div>
                        <span className={`text-[9px] w-16 truncate ${colors.text}`}>
                          {pin.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Pin Legend */}
              <div className="flex flex-wrap justify-center gap-2 mt-4 pt-4 border-t border-gray-700">
                {Object.entries(pinTypeColors).map(([type, colors]) => (
                  <div key={type} className={`flex items-center gap-1 px-2 py-0.5 rounded ${colors.bg}`}>
                    <span className={`w-2 h-2 rounded-full ${colors.border.replace('border', 'bg')}`} />
                    <span className={`text-[10px] ${colors.text} capitalize`}>{type}</span>
                  </div>
                ))}
              </div>

              {/* Hovered/Selected Pin Info */}
              {(hoveredPin || selectedPin) && (
                <div className="mt-4 p-3 bg-gray-900/80 rounded-lg border border-gray-600">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-bold ${pinTypeColors[(hoveredPin || selectedPin)!.type].text}`}>
                      Pin {(hoveredPin || selectedPin)!.number}: {(hoveredPin || selectedPin)!.name}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] ${pinTypeColors[(hoveredPin || selectedPin)!.type].bg} ${pinTypeColors[(hoveredPin || selectedPin)!.type].text} capitalize`}>
                      {(hoveredPin || selectedPin)!.type}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{(hoveredPin || selectedPin)!.description}</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-4">
            {/* MCU Specs */}
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
              <h3 className="text-sm font-bold text-white mb-3">Specifications</h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-gray-900/50 rounded p-2">
                  <span className="text-gray-500">Voltage</span>
                  <p className="text-white font-semibold">{selectedMCU.voltage}</p>
                </div>
                <div className="bg-gray-900/50 rounded p-2">
                  <span className="text-gray-500">Speed</span>
                  <p className="text-white font-semibold">{selectedMCU.speed}</p>
                </div>
                <div className="bg-gray-900/50 rounded p-2">
                  <span className="text-gray-500">Flash</span>
                  <p className="text-white font-semibold">{selectedMCU.flash}</p>
                </div>
                <div className="bg-gray-900/50 rounded p-2">
                  <span className="text-gray-500">RAM</span>
                  <p className="text-white font-semibold">{selectedMCU.ram}</p>
                </div>
              </div>
              <div className="mt-3">
                <span className="text-xs text-gray-500">Features</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedMCU.features.map((f, i) => (
                    <span key={i} className="px-2 py-0.5 bg-orange-500/10 text-orange-400 rounded text-[10px]">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* GPIO Simulation */}
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
              <h3 className="text-sm font-bold text-white mb-3">GPIO Simulation</h3>
              <div className="mb-3">
                <label className="text-xs text-gray-500 block mb-1">Connect Device</label>
                <select
                  value={connectedDevice}
                  onChange={(e) => setConnectedDevice(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-600 rounded px-2 py-1.5 text-sm text-white"
                >
                  <option value="led">💡 LED</option>
                  <option value="motor">⚙️ DC Motor</option>
                  <option value="servo">🔄 Servo Motor</option>
                  <option value="buzzer">🔊 Buzzer</option>
                  <option value="relay">🔌 Relay</option>
                  <option value="sensor">📡 Sensor</option>
                </select>
              </div>

              {/* Virtual Device */}
              <div className="bg-gray-900/80 rounded-lg p-4 text-center">
                {connectedDevice === 'led' && (
                  <div>
                    <div
                      className={`w-16 h-16 mx-auto rounded-full transition-all ${
                        Object.values(gpioStates).some(v => v)
                          ? 'bg-green-500 shadow-lg shadow-green-500/50'
                          : 'bg-gray-700'
                      }`}
                    />
                    <p className="text-xs text-gray-400 mt-2">
                      {Object.values(gpioStates).some(v => v) ? 'LED ON' : 'LED OFF'}
                    </p>
                  </div>
                )}
                {connectedDevice === 'motor' && (
                  <div>
                    <div
                      className={`w-16 h-16 mx-auto rounded-full border-4 border-gray-600 flex items-center justify-center transition-all ${
                        Object.values(gpioStates).some(v => v) ? 'animate-spin' : ''
                      }`}
                    >
                      <div className="w-2 h-8 bg-gray-500 rounded" />
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                      {Object.values(gpioStates).some(v => v) ? 'Motor Running' : 'Motor Stopped'}
                    </p>
                  </div>
                )}
                {connectedDevice === 'servo' && (
                  <div>
                    <div className="relative w-16 h-16 mx-auto">
                      <div className="w-full h-full bg-gray-700 rounded" />
                      <div
                        className="absolute top-1/2 left-1/2 w-1 h-8 bg-orange-500 origin-bottom transition-transform"
                        style={{
                          transform: `translate(-50%, -100%) rotate(${Object.values(gpioStates).some(v => v) ? '90deg' : '0deg'})`,
                        }}
                      />
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                      Angle: {Object.values(gpioStates).some(v => v) ? '90°' : '0°'}
                    </p>
                  </div>
                )}
                {connectedDevice === 'buzzer' && (
                  <div>
                    <div
                      className={`w-16 h-16 mx-auto rounded-full bg-gray-700 flex items-center justify-center ${
                        Object.values(gpioStates).some(v => v) ? 'animate-pulse' : ''
                      }`}
                    >
                      <span className="text-2xl">🔊</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                      {Object.values(gpioStates).some(v => v) ? '♪ Beeping ♪' : 'Silent'}
                    </p>
                  </div>
                )}
                {connectedDevice === 'relay' && (
                  <div>
                    <div className="w-16 h-12 mx-auto bg-blue-900 rounded border border-blue-500 flex items-center justify-center">
                      <div className={`w-8 h-1 transition-all ${Object.values(gpioStates).some(v => v) ? 'bg-green-500' : 'bg-red-500 rotate-45'}`} />
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                      Relay: {Object.values(gpioStates).some(v => v) ? 'CLOSED' : 'OPEN'}
                    </p>
                  </div>
                )}
                {connectedDevice === 'sensor' && (
                  <div>
                    <div className="w-16 h-16 mx-auto bg-purple-900/50 rounded-lg border border-purple-500 flex items-center justify-center">
                      <span className="text-2xl">📡</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                      Reading: {Object.values(gpioStates).some(v => v) ? '1023' : '0'}
                    </p>
                  </div>
                )}
              </div>

              <p className="text-[10px] text-gray-500 mt-3 text-center">
                Click on digital/PWM pins to toggle GPIO state
              </p>
            </div>

            {/* Quick Code Example */}
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
              <h3 className="text-sm font-bold text-white mb-3">Sample Code</h3>
              <pre className="bg-gray-900 rounded p-3 text-[10px] text-gray-300 overflow-x-auto">
{selectedMCU.id.includes('arduino') ? `// Arduino ${connectedDevice.toUpperCase()} Control
const int PIN = 13;

void setup() {
  pinMode(PIN, OUTPUT);
}

void loop() {
  digitalWrite(PIN, HIGH);
  delay(1000);
  digitalWrite(PIN, LOW);
  delay(1000);
}` : selectedMCU.id === 'esp32' ? `// ESP32 ${connectedDevice.toUpperCase()} Control
const int PIN = 2;

void setup() {
  pinMode(PIN, OUTPUT);
}

void loop() {
  digitalWrite(PIN, HIGH);
  delay(1000);
  digitalWrite(PIN, LOW);
  delay(1000);
}` : selectedMCU.id === 'pico' ? `# Raspberry Pi Pico
from machine import Pin
import time

led = Pin(25, Pin.OUT)

while True:
    led.toggle()
    time.sleep(1)` : `// ${selectedMCU.name} Code
// Configure GPIO pin
// Set as output
// Toggle state`}
              </pre>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-4 bg-black/30 mt-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            Built with ❤️ by <span className="text-blue-400 font-semibold">Pavan Kumar</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
