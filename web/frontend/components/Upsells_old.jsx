import {useState,React,useCallback,useEffect} from 'react'
import {useNavigate,NavLink} from "react-router-dom"
import {DataTable, Badge, Button
} from '@shopify/polaris'
import { useAppQuery } from "../hooks"

export default function Upsells() {
  const [upselId,setUpselId] = useState({})
  const [defaultValue,setDefaultValue] = useState("")


  const[id,setId] = useState(0);
  const[isStatusChanged,setIsStatusChanged] = useState(true)
  const[isLoading,setIsLoading] = useState(false)
  const[buttonText,setButtonText] = useState('')
  const[isApiCalled,setIsApiCalled] = useState(false)
  var newText = ''
  const updateUpsellStatus = useCallback((value,index,text) => 
  {
    (text === 'Deactivate') ? newText = 'Activate' : newText = 'Deactivate'
    setButtonText(newText)
    
    setId(value)
    setIsStatusChanged(false)
    setIsLoading(true)
  })
  console.log(buttonText)
  const {
    response
  } = useAppQuery({
    url: `/api/updateUpsellStatus/${id}`,
    reactQueryOptions: {
      onSuccess: () => {
        setIsStatusChanged(true)
        setId(0)
        setIsLoading(false)
        setDefaultValue("5")
        
      },
    },
  });
  const {
    data,    
    refetch: refetchProductCount,
    isLoading: isLoadingCount,
    isRefetching: isRefetchingCount
  } = useAppQuery({
    url: `/api/homeData`,
    reactQueryOptions: {
      onSuccess: () => {
        setIsLoading(false)
        setIsApiCalled(true)
      },
    },
  });

  const rows = [];
  var buttonData = ''
  data?.upsells?.map((upsell,index) => {
    
    (upsell.status === 1 ) ? buttonData = 'Deactivate' : buttonData = 'Activate'
    rows.push([
      <NavLink to={`/upsell/${upsell.id}`} type="button"> {upsell.name} </NavLink>,
      (upsell.status == 1) ? <Badge status="success">Active</Badge> : <Badge status="critical">Deactive</Badge>,
      <Button key={index} loading={upsell.id === upselId.id && isLoading} onClick={() => { 
        updateUpsellStatus(upsell.id,index,buttonData)
        setUpselId(upsell)
      }
    }> {buttonData} </Button>

    ]);
  });

  return (
    <>
      {(isApiCalled === false) ? 
        <center><img className='loading' src='../images/loader.gif' /></center>
        :
        <DataTable
          columnContentTypes={[
              
          ]}
          headings={[
            'Name','Status','Action'
          ]}
          rows={rows}
        />
      }
    </>
  );

}
