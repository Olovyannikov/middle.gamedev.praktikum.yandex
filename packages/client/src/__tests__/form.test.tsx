import { createRoot } from 'react-dom/client';
import { screen } from '@testing-library/react';

import '@testing-library/jest-dom';

import { Form } from '@/components/Form';

describe('Form Component', () => {
    it('Отображает форму с пользовательским className и дочерними элементами', () => {
        const container = document.getElementById('root');
        const testClassName = 'test-class';
        const testChildText = 'Test Child';

        if (container !== null) {
            const root = createRoot(container);

            root.render(
                <Form className={testClassName}>
                    <div>{testChildText}</div>
                </Form>
            );

            const formElement = screen.getByText(testChildText).closest('form');

            expect(formElement).toHaveClass('test-class');

            expect(screen.getByText(testChildText)).toBeInTheDocument();
        }
    });
});
