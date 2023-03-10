import { useState, useCallback, React } from 'react'
import {NavLink,useNavigate} from "react-router-dom"
import {Page, Card, DataTable, Badge, Button,
    Form, FormLayout, Checkbox, TextField,
    Layout, ResourceList, Thumbnail, List,
    RadioButton, Stack, ChoiceList
} from '@shopify/polaris'
import DiscountUpsell from '../components/DiscountUpsell'
import OrderState from '../components/OrderState'
import BottomButton from '../components/BottomButton'
import {Provider, ResourcePicker} from '@shopify/app-bridge-react'
import { useAppQuery, useAuthenticatedFetch, useAppMutation } from "../hooks"

export default function createUpsell()
{
    const navigate = useNavigate();

    const [upsellName,setUpsellName] = useState('');
    const handleUpsellNameChange = useCallback((value) => setUpsellName(value));
    const[id,setId] = useState(false)

    const [lineOne,setLineOne] = useState('You have unlocked an amazing offer!');
    const lineOneChange = useCallback((value) => setLineOne(value))
    
    const [lineTwo,setLineTwo] = useState('You have unlocked an amazing offer!');
    const lineTwoChange = useCallback((value) => setLineTwo(value))
     
    const [productDiscription,setProductDiscription] = useState('');
    const handleProductDiscriptionChange = useCallback((value) => setProductDiscription(value))
    
    // states for discount
      const [discountChecked, setDiscountChecked] = useState(false)
      const [discountValue,setDiscountValue] = useState(0)
      
      const [showsForCheck, setShowsForCheck] = useState('all')
      const handleShowsForCheckChange = useCallback(
          (_checked, value) => setShowsForCheck(value)
        )
      
      // states for Order State
      const [orderAmount, setOrderAmount] = useState('10')
      const [orderTotalCondition, setorderTotalCondition] = useState('')
      const [orderLineItemCondition,setOrderLineItemCondition] = useState('')
      const [orderLineItem,setorderLineItem] = useState('5')
      const [orderContainState, setOrderContainState] = useState(false)
      const [orderTotalState, setOrderTotalState] = useState(false)
      const [orderLineItemState, setOrderLineItemState] = useState(false) 

        const[saveButtonLoading,setSaveButtonLoading] = useState(false)

      const {  mutate, status } = useAppMutation({
        url: "/api/saveUpsell",
        fetchInit: {},
        reactQueryOptions: {},
        route: "/"
      });

      const handleFormSubmit = async () => {
        setSaveButtonLoading(true)
        const payload = {
            upsellName : upsellName,
            description: productDiscription,
            isDiscountEnabled: discountChecked,
            discountValue: discountValue,
            showsForOption: showsForCheck,
            lineOne: lineOne,
            lineTwo: lineTwo,
            isRule1: orderContainState,
            isRule2: orderTotalState,
            isRule3: orderLineItemState,
            rule2Select: orderTotalCondition,
            rule2Value: orderAmount,
            rule3Select: orderLineItemCondition,
            rule3Value: orderLineItem,
        }
            await mutate(payload);
        }

        const config = {
            // The client ID provided for your application in the Partner Dashboard.
            apiKey: "ed09e279f4755ea75c4a74d6118b1cfd",
            // The host of the specific shop that's embedding your app. This value is provided by Shopify as a URL query parameter that's appended to your application URL when your app is loaded inside the Shopify admin.
            host: 'Y2hlY2tvdXQtaGVyby5teXNob3BpZnkuY29tL2FkbWlu',
            forceRedirect: true
        }

        const[popUp,setPopUp] = useState(false)

        const handlePopoverCancle = useCallback(() => {
            setPopUp(false)
        })
        
        const[showForProduct,setShowForProduct] = useState(false)

        const handleShowForPopoverCancle = useCallback(() => {
            setShowForProduct(false)
        })
        
        const[showForCollection,setShowForCollection] = useState(false)

        const handleShowForCollectionPopoverCancle = useCallback(() => {
            setShowForCollection(false)
        })


    return (
        <>
            <Page>
                <Layout>
                    <Layout.Section oneThird>
                        <Card>
                            <Card.Section>
                            <TextField
                                placeholder='Enter Upsell Name'
                                value={upsellName}
                                type='text'
                                label='Upsell Name'
                                onChange={handleUpsellNameChange}
                            />
                            </Card.Section>
                        </Card>
                        <Card>
                            <Card.Section>
                                <p style={{ marginBottom: "5px" }}>Upsell Product</p>
                                <Button type="button" onClick={() => {
                                    setPopUp(true)
                                }} > Select Product </Button>
                                {popUp &&
                                    <Provider config={config}>
                                        <ResourcePicker onCancel={handlePopoverCancle} resourceType="Product" open />
                                    </Provider>
                                }
                            </Card.Section>
                            <Card.Section>
                                <TextField
                                    placeholder='200 characters max'
                                    value={productDiscription}
                                    type='text'
                                    label='Product Description'
                                    onChange={handleProductDiscriptionChange}
                                />
                            </Card.Section>
                            <Card.Section>
                            <DiscountUpsell discountChecked={discountChecked} setDiscountChecked={setDiscountChecked}
                                discountValue={discountValue} setDiscountValue={setDiscountValue}
                            />
                            </Card.Section>
                        </Card>
                        <Card title="Shows for">
                            <Card.Section>
                            <Stack vertical>
                                <RadioButton
                                    label="All products"
                                    id='all'
                                    checked={showsForCheck === 'all'}
                                    name="accounts"
                                    onChange={handleShowsForCheckChange}
                                />
                                <RadioButton
                                    label="Specific products"
                                    checked={showsForCheck === 'products'}
                                    id='products'
                                    name="accounts"
                                    onChange={handleShowsForCheckChange}
                                />
                                <RadioButton
                                    label="Specific collections"
                                    id='collections'
                                    checked={showsForCheck === 'collections'}
                                    name="accounts"
                                    onChange={handleShowsForCheckChange}
                                />
                                {showsForCheck === 'products' &&
                                    <Button onClick={() => {
                                        setShowForProduct(true)
                                    }}>Select Products</Button>
                                }
                                {showForProduct &&
                                    <Provider config={config}>
                                        <ResourcePicker onCancel={handleShowForPopoverCancle} resourceType="Product" open />
                                    </Provider>
                                }
                                {showsForCheck === 'collections' &&
                                    <Button onClick={() => {
                                        setShowForCollection(true)
                                    }}>Select Collections</Button>
                                }
                                {showForCollection &&
                                    <Provider config={config}>
                                        <ResourcePicker onCancel={handleShowForCollectionPopoverCancle} resourceType="Collection" open />
                                    </Provider>
                                }
                            </Stack>
                            </Card.Section>
                            <Card.Section>
                            <OrderState orderAmount={orderAmount} setOrderAmount={setOrderAmount}
                                orderTotalCondition={orderTotalCondition} setorderTotalCondition={setorderTotalCondition}
                                orderLineItemCondition={orderLineItemCondition} setOrderLineItemCondition={setOrderLineItemCondition}
                                orderLineItem={orderLineItem} setorderLineItem={setorderLineItem}
                                orderContainState={orderContainState} setOrderContainState={setOrderContainState}
                                orderTotalState={orderTotalState} setOrderTotalState={setOrderTotalState}
                                orderLineItemState={orderLineItemState} setOrderLineItemState={setOrderLineItemState}
                            />
                            </Card.Section>
                        </Card>
                    </Layout.Section>
                    
                    <Layout.Section oneThird>
                        <Card>
                            <Card.Section>
                                <p>Callout banner</p>
                            </Card.Section>
                            <Card.Section>
                            <List type="bullet">
                                <List.Item>product will insert the product name.</List.Item>
                                <List.Item>discount will insert the discount value, if applicable.</List.Item>
                            </List>
                            </Card.Section>
                            <Card.Section>
                                <TextField
                                    value={lineOne}
                                    type='text'
                                    label='Line one'
                                    onChange={lineOneChange}
                                />
                            </Card.Section>
                            <Card.Section>
                                <TextField
                                    value={lineTwo}
                                    type='text'
                                    label='Line two'
                                    onChange={lineTwoChange}
                                />
                            </Card.Section>
                        </Card>
                    </Layout.Section>
                </Layout>
                <BottomButton
                    id={id}
                    saveButtonLoading={saveButtonLoading}
                    handleFormSubmit={handleFormSubmit} 
                />
            </Page>
            
        </>
    );
}