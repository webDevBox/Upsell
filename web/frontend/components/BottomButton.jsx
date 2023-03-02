import { useState, useCallback, React } from "react"
import {Page, Card, DataTable, Badge, Button,
    Form, FormLayout, Checkbox, TextField,
    Layout, ResourceList, Thumbnail, List,
    RadioButton, Stack, ChoiceList
} from '@shopify/polaris'
import { NavLink,useNavigate } from "react-router-dom"


export default function BottomButton(props)
{
    const navigate = useNavigate();
    const handleBackButton = () => {
        navigate('/')
    }

    return(
        <>
            <div className="flex mt-10">
                {
                    (props.id !== false) ?
                        (props.deleteButtonLoading == false) ?
                        <Button onClick={props.handleDeleteUpsell} destructive> Delete Upsell </Button>
                        :
                        <Button loading />
                    :
                    ''
                }
                <Button onClick={handleBackButton} > Back </Button>
                <div className="right">
                { (props.saveButtonLoading == false) ?
                    <button onClick={props.handleFormSubmit} className="button btn-purple"> Save </button>
                    :
                    <Button loading />
                }
                </div>
            </div>
        </>
    )
}