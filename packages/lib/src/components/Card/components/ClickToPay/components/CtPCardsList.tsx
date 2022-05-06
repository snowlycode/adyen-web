import Button from '../../../../internal/Button';
import { Fragment, h } from 'preact';
import { useCallback } from 'preact/hooks';
import useClickToPayContext from '../context/useClickToPayContext';

const buttonStyle = {
    width: '100%',
    height: '40px',
    backgroundColor: 'white',
    border: 'none',
    borderRadius: '4px',
    marginBottom: '20px',
    boxShadow: '0 0 0 2px #999595',
    cursor: 'pointer'
};

const CtPCardsList = () => {
    const context = useClickToPayContext();

    const onCheckout = useCallback(async (srcDigitalCardId: string) => {
        console.log('do checkout', srcDigitalCardId);
    }, []);

    return (
        <Fragment>
            <div>
                {context.cards?.map((card, index) => (
                    <button key={index} style={buttonStyle} onClick={() => onCheckout(card.srcDigitalCardId)}>
                        {`XXXX XXXX XXXX ${card.panLastFour} ${card.panExpirationMonth}/${card.panExpirationYear}`}
                    </button>
                ))}
            </div>
            <Button label="Pay" />
        </Fragment>
    );
};

export default CtPCardsList;