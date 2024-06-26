import { Meta, StoryObj } from '@storybook/preact';
import { PaymentMethodStoryProps } from '../types';
import { getStoryContextCheckout } from '../../utils/get-story-context-checkout';
import { UPIElementProps } from '../../../src/components/UPI/types';
import { Container } from '../Container';

type UpiStory = StoryObj<PaymentMethodStoryProps<UPIElementProps>>;

const meta: Meta<PaymentMethodStoryProps<UPIElementProps>> = {
    title: 'Components/UPI'
};
export default meta;

export const UPI: UpiStory = {
    render: (args, context) => {
        const checkout = getStoryContextCheckout(context);
        return <Container type={'upi'} componentConfiguration={args.componentConfiguration} checkout={checkout} />;
    },
    args: {
        countryCode: 'IN'
    }
};
