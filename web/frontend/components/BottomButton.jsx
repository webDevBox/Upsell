import { useState, useCallback, React } from "react"
import {Page, Card, DataTable, Badge, Button,
    Form, FormLayout, Checkbox, TextField,
    Layout, ResourceList, Thumbnail, List,
    RadioButton, Stack, ChoiceList
} from '@shopify/polaris'
import { NavLink } from "react-router-dom"


export default function BottomButton(props)
{
    return(
        <>
            <div className="flex mt-10">
                <Button destructive> Delete Upsell </Button>
                <Button url={"/"} > Back </Button>
                <div className="right">
                    <button onClick={props.handleFormSubmit} className="button btn-purple"> Save </button>
                </div>
            </div>
        </>
    )
}