"use client"
import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import {sortEventsByTime} from '@/lib/utils';
import RdvCardDay from './rdvCardDay'
import { EventsData, Event } from '@/types/EventCalendarTypes'
import { supabaseClient } from '@/utils/supabase/client'
import moment from 'moment'
import { FaSquarePlus } from "react-icons/fa6";

type Props = {
    currentDay: moment.Moment;
}

const CalendarDayRdv = ({currentDay}: Props) => {

    const [evenements, setEvenements] = useState<EventsData>([]);
    console.log("evenements", evenements);

    const sortedEvents = evenements ? sortEventsByTime(evenements) : [];

    const formatedCurrentDay = currentDay.format('YYYY-MM-DD');

    /* const setDateInstallation = async () => {
    
        try {
            const currentDateStored = await localStorage.getItem('date-installation'); 
            
            if(currentDateStored) {
                try {
                    // Merge the new date as JSON
                    const newDate = { "date": currentDay.format('YYYY-MM-DD') }; // Ensure this is an object
                    await localStorage.mergeItem('date-installation', JSON.stringify(newDate));

                } catch (error) {
                    console.log(error)
                }
            }
            else {
                try {
                    // Store the date as a JSON object
                    const initialDate = { "date": currentDay.format('YYYY-MM-DD') };
                    localStorage.setItem('date-installation', JSON.stringify(initialDate));

                } catch (error) {
                    console.log(error)
                }
            }
        } catch (error) {
            console.log("error:", error)
        }
    } */

    useEffect(() => {
        const fetchEvents = async () => { 
                //const currentTechnicien = localStorage.getItem('technicien');
                //const currentTechnicienParsed = currentTechnicien!= null ? JSON.parse(currentTechnicien) : null;
                // if(currentTechnicien) {
                  const { data: events, error, status } = await supabaseClient
                    .from('planning')
                    .select()
                    .eq('date_installation', formatedCurrentDay)
                    // .eq('technicien', currentTechnicienParsed?.id);
                    // .eq('technicien', "7");
                    if(error) {
                        console.log(error.message);
                    }
                    if (events) {
                    setEvenements(events);
                    }
                // }
        };
        fetchEvents();
        //setDateInstallation();
    }, [currentDay]);

    useEffect(() => {
        const channelInsert = supabaseClient.channel('planning_db_insert')
          .on('postgres_changes', { 
              event: 'INSERT', 
              schema: 'public', 
              table: 'planning' },
              //(payload: any) => console.log('Change received!', payload.new))
              (payload: any) => setEvenements((prevState) => [...prevState, payload.new as Event]))
              .subscribe(); 
    
        return () => {
            supabaseClient.removeChannel(channelInsert)
          
        }
    }, [supabaseClient, evenements, setEvenements])

    useEffect(() => {

        const channelUpdate = supabaseClient.channel('planning_db_update')
          .on('postgres_changes', { 
              event: 'UPDATE', 
              schema: 'public', 
              table: 'planning' },
              //(payload: any) => console.log('Change received!', payload.new))
              (payload: any) => setEvenements((prevState) => prevState.map(event => 
                event.id === payload.old.id ? payload.new as Event : event)))
              .subscribe(); 
    
      return () => {
        supabaseClient.removeChannel(channelUpdate)
        
      }
      }, [supabaseClient, evenements, setEvenements])

  
  return (
    <div className="relative">
        {sortedEvents && sortedEvents.map((event, index) => (
            <RdvCardDay key={event.id} event={event} index={index} currentDay={currentDay}/>
        ))} 
       
        {/* <Link 
        className="absolute right-5 bottom-6 shadow-2xl bg-blue-700 p-3 rounded-2xl"
        href="/create-event"
        >
            <FaSquarePlus className="w-6 h-6 text-nest-bleue"/>
        </Link> */}
    </div>
  )
}

export default CalendarDayRdv