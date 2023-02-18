import React, { useEffect } from 'react'
import request from '@/utils/request'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import { allCheck, selectTaskList } from '@/store/services/taskSlice'

export default function TestOne() {
  const taskList = useAppSelector(selectTaskList)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const getUsers = async () => {
      const res = await request.get('/users')
      console.log(res)
    }
    getUsers()
    console.log(taskList)
    setTimeout(() => dispatch(allCheck(false)), 3000)
    return () => {}
  }, [])

  return <div>TestOne</div>
}
