import { useState, useCallback, React } from 'react'
import {NavLink} from "react-router-dom"
import {Button, Checkbox, Popover, ActionList,
    Stack,
  FormLayout,
  TextField,
  Select,
  InlineError,
  Card,
  Link,
} from '@shopify/polaris'


export default function OrderState(props) {


    const handleOrderTotalChange = useCallback((value) => props.setOrderAmount(value))
    
    
    const handleOrderTotalConditionChange = useCallback((value) => props.setorderTotalCondition(value))

  const formOrderTotal = (
      <FormLayout>
        <FormLayout.Group condensed>
          <Select
            id='orderTotalSelect'
            options={['Greater than','Less than','Equal to']}
            value={props.orderTotalCondition}
            onChange={handleOrderTotalConditionChange}
          />
          <TextField
            id='orderTotalAmount'
            type="number"
            value={props.orderAmount}
            onChange={handleOrderTotalChange}
          />
        </FormLayout.Group>
      </FormLayout>
  )
  
  
  const handleOrderLineItemConditionChange = useCallback((value) => props.setOrderLineItemCondition(value))
  const handleOrderLineItemChange = useCallback((value) => props.setorderLineItem(value))
  
  const formLineItem = (
      <FormLayout>
        <FormLayout.Group condensed>
          <Select
            id='orderTotal'
            options={['Greater than','Less than','Equal to']}
            value={props.orderLineItemCondition}
            onChange={handleOrderLineItemConditionChange}
          />
          <TextField
            type="number"
            value={props.orderLineItem}
            onChange={handleOrderLineItemChange}
          />
        </FormLayout.Group>
      </FormLayout>
  )

    
    const handleOrderContain = useCallback((newChecked) => props.setOrderContainState(newChecked))
    const handleTotalOrder = useCallback((newChecked) => props.setOrderTotalState(newChecked))
    const handleLineItems = useCallback((newChecked) => props.setOrderLineItemState(newChecked))


return(
    <>
        <Checkbox
            label="Order does not contain upsell product"
            checked={props.orderContainState}
            onChange={handleOrderContain}
        />
        <br />
        <Checkbox
            label="Order total"
            checked={props.orderTotalState}
            onChange={handleTotalOrder}
        />
        <Card sectioned>{formOrderTotal}</Card>
            
        <Checkbox
            label="Number of line items in order"
            checked={props.orderLineItemState}
            onChange={handleLineItems}
        />
        <Card sectioned>{formLineItem}</Card>

    </>
)
}