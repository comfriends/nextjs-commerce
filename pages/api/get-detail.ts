import React from 'react'
import { NextApiRequest, NextApiResponse } from 'next'
import { Client } from '@notionhq/client'

const notion = new Client({
  auth: 'secret_cNyiFARWux7ezYn5fKrnCJeMVv3Xa9H9MntGjXCqmmM',
})

const databaseId = '1dad9796ee7943c6bef30ce98750e6e1'

async function getDetail(pageId: string, propertyId: string) {
  try {
    const response = await notion.pages.properties.retrieve({
      page_id: pageId,
      property_id: propertyId,
    })
    console.log(response)
    return response
  } catch (error) {
    console.log(JSON.stringify(error))
  }
}

type Data = {
  detail?: any
  message: string
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  try {
    const { pageId, propertyId } = req.query
    const response = await getDetail(String(pageId), String(propertyId))
    res.status(200).json({ detail: response, message: 'Success' })
  } catch (error) {
    res.status(400).json({ message: `Failed` })
  }
}
