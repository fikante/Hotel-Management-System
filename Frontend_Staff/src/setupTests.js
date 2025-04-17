import fetchMock from 'jest-fetch-mock';
import { TextEncoder, TextDecoder } from 'util';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

fetchMock.enableMocks(); // Enable fetch mocking

// Keep this line too:
import '@testing-library/jest-dom';

// Any other global setup...
import '@testing-library/jest-dom';
