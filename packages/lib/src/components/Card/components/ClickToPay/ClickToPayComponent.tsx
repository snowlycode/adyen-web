import { Fragment, h } from 'preact';
import { CtpState } from '../../services/ClickToPayService';
import useClickToPayContext from './context/useClickToPayContext';
import CtPOneTimePassword from './components/CtPOneTimePassword';
import CtPCardsList from './components/CtPCardsList';
import CtPSection from './components/CtPSection';
import ContentSeparator from '../../../internal/ContentSeparator';

/**
 * TODO:
 * Scenarios to think:
 * - CtP Card is selected , then shopper focus on credit card field and type something. What happens?
 * - Credit card data is entered by shopper. Then shopper goes and clicks on CtP available card. What happens?
 * - When getSrcProfile returns multiple profiles? Is it when there are multiple schemas?
 */

const ClickToPayComponent = () => {
    const context = useClickToPayContext();

    if (context.ctpState === CtpState.NotAvailable) {
        return null;
    }

    return (
        <Fragment>
            <CtPSection isLoading={context.ctpState === CtpState.Loading}>
                {context.ctpState === CtpState.OneTimePassword && <CtPOneTimePassword />}
                {context.ctpState === CtpState.Ready && <CtPCardsList />}
            </CtPSection>
            <ContentSeparator classNames={['adyen-checkout-ctp__separator']} label="Or enter card details manually" />
        </Fragment>
    );
};

export default ClickToPayComponent;