import {React,useCallback,useState} from 'react'
import {ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip} from 'recharts'
import {Page, Card, DataTable, Badge, Button,
  Form, FormLayout, Checkbox, TextField,
  Layout, ResourceList, Thumbnail, List,
  RadioButton, Stack, ChoiceList
} from '@shopify/polaris'

export default function Conversion(props)
{
    return(
        <>
            <Card title="Conversions">
                {(props.isLoading === true) ?
                    <center><img className='loading' src='../images/loader.gif' /></center>
                    :
                    <Card.Section title={props.conversions}>
                        <center>
                            <ResponsiveContainer width="50%" aspect={2} >
                                <BarChart data={props.conversionBar}  >
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="total" fill="#FFE0E6" stroke="#FF416A" strokeWidth={1} />
                                </BarChart>
                            </ResponsiveContainer>
                        </center>
                    </Card.Section>
                }
            </Card>
        </>
    )
}