import {React,useCallback,useState} from 'react'
import {ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip} from 'recharts'
import {Page, Card, DataTable, Badge, Button, Pagination
} from '@shopify/polaris'
import { useAppQuery } from "../../hooks"
import moment from 'moment'


export default function UpsellTable(props)
{
  const[isLoading,setIsLoading] = useState(true)

  const [rows,setRows] = useState([])
  let revenue
  let type
  let productId
  let customerId
  let timeStamp
  const {
    response,    
    refetch: refetchProductCount,
    isLoading: isLoadingCount,
    isRefetching: isRefetchingCount
  } = useAppQuery({
    url: `/api/getUpsellLogs`,
    reactQueryOptions: {
      onSuccess: (response) => {
        const newRows = []
        response.upsellLogs.data.map((log) => {
          type = (log.price_change !== null) ? <Badge status="success">Redemption</Badge> : <Badge status="info">View</Badge>
          revenue = (log.price_change === null) ? 0 : log.price_change;
          productId = log.upsell_product_id.split("/")
          productId = productId[productId.length - 1]
          productId = productId.replace('"','')
          
          timeStamp = moment(log.timestamp).fromNow()
          // timeStamp = log.timestamp
          customerId = log.customer_id
          newRows.push([
              type, productId, customerId, revenue, timeStamp
            ],
          )
        })
        setRows(newRows)
        setIsLoading(false)

      },
    },
  });

  return(
    <>
      <Card title="Upsell Logs">
        <Card.Section>
          {(isLoading === true) ?
              <center><img className='loading' src='../images/loader.gif' /></center>
              :
              <DataTable
                columnContentTypes={[
                    
                ]}
                headings={[
                  'Type','Product ID','Customer ID', 'Additional Revenue', 'Time'
                ]}
                rows={rows}
              />
            }
            {(isLoading === false) ?
              <div className='center'>
                <Pagination
                  hasPrevious
                  onPrevious={() => {
                    console.log('Previous');
                  }}
                  hasNext
                  onNext={() => {
                    console.log('Next');
                  }}
                />
              </div>
              :
              ''
            }
        </Card.Section>
      </Card>
    </>
  )
}