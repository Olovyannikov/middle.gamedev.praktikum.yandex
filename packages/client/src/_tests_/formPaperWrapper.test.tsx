import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FormPaperWrapper } from '../components/FormPaperWrapper';
import { createRoot } from 'react-dom/client';

describe('FormPaperWrapper Component', () => {
    it('renders its children correctly', () => {
        const testChildText = 'Test Child';
        const container = document.getElementById('root');

        if (container !== null) {
            const root = createRoot(container);

            root.render(
                <FormPaperWrapper>
                    <div>{testChildText}</div>
                </FormPaperWrapper>
            );

            expect(screen.getByText(testChildText)).toBeInTheDocument();
        }
    });
});
