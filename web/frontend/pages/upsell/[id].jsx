import {React,useState,useCallback} from "react"
import { useParams,NavLink,useNavigate } from 'react-router-dom'
import {Page, Card, DataTable, Badge, Button,
    Form, FormLayout, Checkbox, TextField,
    Layout, ResourceList, Thumbnail, List,
    RadioButton, Stack, ChoiceList,
    Popover, ActionList,Select
} from '@shopify/polaris'
import { useAppQuery, useAppMutation } from "../../hooks"
import BottomButton from '../../components/BottomButton'

export default function editUpsell()
{
    const { id } = useParams();
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

        const handleChange = useCallback((newCheckedState) => setDiscountChecked(newCheckedState))
        const handleDiscountChange = useCallback((value) => setDiscountValue(value))

        const handleOrderTotalChange = useCallback((value) => setOrderAmount(value))
        const handleOrderTotalConditionChange = useCallback((value) => setorderTotalCondition(value))
        const formOrderTotal = (
            <FormLayout>
              <FormLayout.Group condensed>
                <Select
                  id='orderTotalSelect'
                  options={['Greater than','Less than','Equal to']}
                  value={orderTotalCondition}
                  onChange={handleOrderTotalConditionChange}
                />
                <TextField
                  id='orderTotalAmount'
                  type="number"
                  value={orderAmount}
                  onChange={handleOrderTotalChange}
                />
              </FormLayout.Group>
            </FormLayout>
        )

        const handleOrderLineItemConditionChange = useCallback((value) => setOrderLineItemCondition(value))
        const handleOrderLineItemChange = useCallback((value) => setorderLineItem(value))
  
  const formLineItem = (
      <FormLayout>
        <FormLayout.Group condensed>
          <Select
            id='orderTotal'
            options={['Greater than','Less than','Equal to']}
            value={orderLineItemCondition}
            onChange={handleOrderLineItemConditionChange}
          />
          <TextField
            type="number"
            value={orderLineItem}
            onChange={handleOrderLineItemChange}
          />
        </FormLayout.Group>
      </FormLayout>
  )

  const handleOrderContain = useCallback((newChecked) => setOrderContainState(newChecked))
    const handleTotalOrder = useCallback((newChecked) => setOrderTotalState(newChecked))
    const handleLineItems = useCallback((newChecked) => setOrderLineItemState(newChecked))

      const {
        response,
        isLoading,
        isRefetching 
            } = useAppQuery({
        url: `/api/getUpsell/${id}`, 
        reactQueryOptions: {
          onSuccess: (response) => {
            handleResponse(response)
          },
        },
      });

      const handleResponse = useCallback((response) => {
        setUpsellName(response.upsell.name)
        setProductDiscription(response.upsell.description)
        if(response.upsell.is_discount_enabled == 1)
        {
            setDiscountChecked(true)
            setDiscountValue(response.upsell.discount_value)
        }
        setShowsForCheck(response.upsell.shows_for_option)
        if(response.upsell.is_rule_1 === 1)
        {
            setOrderContainState(true)
        }
        
        if(response.upsell.rule_2_select !== null)
        {
            setOrderTotalState(true)
            setorderTotalCondition(response.upsell.rule_2_select)
            setOrderAmount(response.upsell.rule_2_value)
        }
        
        if(response.upsell.rule_3_select !== null)
        {
            setOrderLineItemState(true)
            setOrderLineItemCondition(response.upsell.rule_3_select)
            setorderLineItem(response.upsell.rule_3_value)
        }


        setLineOne(response.upsell.line_one) 
        setLineTwo(response.upsell.line_two)
      })

      const {  mutate, status } = useAppMutation({
        url: "/api/saveUpsell",
        fetchInit: {},
        reactQueryOptions: {},
        route: "/"
      });
      const[saveButtonLoading,setSaveButtonLoading] = useState(false)
      const[deleteButtonLoading,setDeleteButtonLoading] = useState(false)

      const handleFormSubmit = async () => {
        setSaveButtonLoading(true)
        const payload = {
            id: id,
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
            lineOne: lineOne,
            lineTwo: lineTwo
        }
            await mutate(payload);
        }

        const[foriegn,setForiegn] = useState(0)
        const handleDeleteUpsell = () => {
            setDeleteButtonLoading(true)
            setForiegn(id)
        }

        const {
            deleteUpsell
            } = useAppQuery({
            url: `/api/deleteUpsell/${foriegn}`,
            reactQueryOptions: {
              onSuccess: (response) => {
                if(foriegn !== 0)
                    navigate('/')
              },
            },
          });

    return(
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
                            <Checkbox
                                label="Apply Discount"
                                checked={discountChecked}
                                onChange={handleChange}
                            />
                            {discountChecked &&
                                <TextField
                                    placeholder='Enter Discount Percent'
                                    value={discountValue}
                                    type='number'
                                    label='Discount'
                                    onChange={handleDiscountChange}
                                />
                            }
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
                                    <Button>Select Products</Button>
                                }
                                {showsForCheck === 'collections' &&
                                    <Button>Select Collections</Button>
                                }
                            </Stack>
                            </Card.Section>
                            <Card.Section>
                            
                            <Checkbox
                                label="Order does not contain upsell product"
                                checked={orderContainState}
                                onChange={handleOrderContain}
                            />
                            <br />
                            <Checkbox
                                label="Order total"
                                checked={orderTotalState}
                                onChange={handleTotalOrder}
                            />
                            <Card sectioned>{formOrderTotal}</Card>
                                
                            <Checkbox
                                label="Number of line items in order"
                                checked={orderLineItemState}
                                onChange={handleLineItems}
                            />
                            <Card sectioned>{formLineItem}</Card>

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
                deleteButtonLoading={deleteButtonLoading}
                saveButtonLoading={saveButtonLoading}
                handleDeleteUpsell={handleDeleteUpsell} 
                handleFormSubmit={handleFormSubmit} />
            </Page>
        </>
    )
}