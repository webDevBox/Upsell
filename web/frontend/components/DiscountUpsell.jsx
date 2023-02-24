import { useState, useCallback, React } from 'react'
import {NavLink} from "react-router-dom"
import {Page, Card, DataTable, Badge, Button,
    Form, FormLayout, Checkbox, TextField,
    Layout, ResourceList, Thumbnail,
} from '@shopify/polaris'

export default function DiscountUpsell(props)
{
    const handleChange = useCallback((newCheckedState) => props.setDiscountChecked(newCheckedState))
    const handleDiscountChange = useCallback((value) => props.setDiscountValue(value))

    return(
        <>
            <Checkbox
                label="Apply Discount"
                checked={props.discountChecked}
                onChange={handleChange}
            />
            {props.discountChecked &&
                <TextField
                    placeholder='Enter Discount Percent'
                    value={props.discountValue}
                    type='number'
                    label='Discount'
                    onChange={handleDiscountChange}
                />
            }
        </>
    );
}