import {React,useCallback,useState} from 'react'
import {ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip} from 'recharts'
import {Page, Card, DataTable, Badge, Button,
  Form, FormLayout, Checkbox, TextField,
  Layout, ResourceList, Thumbnail, List,
  RadioButton, Stack, ChoiceList
} from '@shopify/polaris'
import { useAppQuery } from "../hooks"
import Impression from '../components/Analytics/Impression'
import Conversion from '../components/Analytics/Conversion'
import Revenue from '../components/Analytics/Revenue'
// import UpsellTable from '../components/Analytics/UpsellTable'

export default function Analytics() {
  const[impressions,setImpressions] = useState()
  const[conversions,setConversions] = useState()
  const[revenue,setRevenue] = useState()
  const[isLoading,setIsLoading] = useState(true)
  const [impressionBar,setImpressionBar] = useState([])
  const [conversionBar,setConversionBar] = useState([])
  const [revenueBar,setRevenueBar] = useState([])
 
  const {
    response,
    refetch: refetchProductCount,
    isLoading: isLoadingCount,
    isRefetching: isRefetchingCount
  } = useAppQuery({
    url: "/api/getGraphsData",
    reactQueryOptions: {
      onSuccess: (response) => {
        const newImpressionBar = []
        const newConversionBar = []
        const newRevenueBar = []
        response.impressionsBar.map((impression) => {
          newImpressionBar.push({
              date: impression.date,
              total: impression.total
            },
          )
        })
        response.conversionBar.map((conversion) => {
          newConversionBar.push({
              date: conversion.date,
              total: conversion.total
            },
          )
        })
        response.revenueBar.map((revenue) => {
          newRevenueBar.push({
              date: revenue.date,
              total: revenue.total
            },
          )
        })
        setImpressionBar(newImpressionBar)
        setConversionBar(newConversionBar)
        setRevenueBar(newRevenueBar)

        setImpressions(response.impressions)
        setConversions(response.conversions)
        setRevenue(response.additionalRevenue)
        setIsLoading(false)
        
      },
    },
  })

  return (
    <>
      <Page>
        <Layout>
          <Layout.Section oneThird>
            <Impression impressions={impressions}
              impressionBar={impressionBar} isLoading={isLoading}
            />
            <Conversion conversions={conversions}
              conversionBar={conversionBar} isLoading={isLoading}
            />
            <Revenue revenue={revenue}
              revenueBar={revenueBar} isLoading={isLoading}
            />
          </Layout.Section>
        </Layout>
      </Page> 
    </>
  )
}