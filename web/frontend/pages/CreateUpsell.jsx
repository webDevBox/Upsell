import { useState, useCallback, React } from 'react'
import axios from 'axios'
import {NavLink,useNavigate} from "react-router-dom"
import {Page, Card, DataTable, Badge, Button,
    Form, FormLayout, Checkbox, TextField,
    Layout, ResourceList, Thumbnail, List,
    RadioButton, Stack, ChoiceList
} from '@shopify/polaris';
import DiscountUpsell from '../components/DiscountUpsell'
import OrderState from '../components/OrderState'
import BottomButton from '../components/BottomButton'
import { useAppQuery, useAuthenticatedFetch, useAppMutation } from "../hooks"
import { useMutation, useQueryClient } from 'react-query';


import createApp from '@shopify/app-bridge';
import { getSessionToken } from '@shopify/app-bridge-utils';

export default function createUpsell()
{
    const navigate = useNavigate();

    const [upsellName,setUpsellName] = useState('');
    const handleUpsellNameChange = useCallback((value) => setUpsellName(value));

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

      const {  mutate, status } = useAppMutation({
        url: "/api/saveUpsell",
        fetchInit: {},
        reactQueryOptions: {},
        route: "/"
      });

      const handleFormSubmit = async () => {
        const payload = {
            upsellName : upsellName,
            description: productDiscription,
            isDiscountEnabled: discountChecked,
            discountValue: discountValue,
            showsForOption: showsForCheck,
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
                                <Button type="button" > Select Product </Button>
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
                <BottomButton handleFormSubmit={handleFormSubmit} />
            </Page>
            
        </>
    );
}