import React from 'react'
import { useState, useCallback } from "react";
import {NavLink} from "react-router-dom"
import {Page, Layout, Card, DataTable, Badge,
  Button, Modal
} from '@shopify/polaris';
import { useAppQuery } from "../hooks"
import Upsells from '../components/Upsells'

export default function App() {  
  const [active, setActive] = useState(true);

  const handleChange = useCallback(() => setActive(!active), [active]);

  const activator = <center> <a className='Model-opener' onClick={handleChange}>How checkout hero works?</a> </center>

  return (
    <>
        <Page title="My Upsells">
          <Layout>
            <Layout.Section oneThird>
              <Card>
                <Card.Section>
                <Upsells />
                  {/* { isStatusChanged === true ?
                    
                    :
                    <center><img className='loading' src='../images/loader.gif' /></center>
                  } */}
                </Card.Section>
              </Card>
              <NavLink to={"/createUpsell"} type="button" className="button create-upsell-button"> Create Upsell </NavLink>
              <Modal
              activator={activator}
              open={!active}
              onClose={handleChange}
              title="How does Checkout Hero work?">
                <Modal.Section>
                  <p>
                    Use Instagram posts to share your products with millions of
                    people. Let shoppers buy from your store without leaving
                    Instagram.
                  </p>
                </Modal.Section>
              </Modal>
          </Layout.Section>
        </Layout>
      </Page>
    </>
  );

}
