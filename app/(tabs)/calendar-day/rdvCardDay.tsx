"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Event } from '@/types/EventCalendarTypes';
//import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabaseClient } from '@/utils/supabase/client'

interface StatutItem {
    value: string;
    label: string;
    bgColor: string;
    textColor?: string;
}

const statutItems: StatutItem[] = [
    { value: "Planifié", label: "A replanifié", bgColor: "bg-yellow-600", textColor: "text-yellow-600" },
    { value: "Installé", label: "Installé", bgColor: "bg-green-600", textColor: "text-green-600" },
    { value: "A replanifié", label: "A replanifié", bgColor: "bg-violet-600", textColor: "text-violet-600" },
    { value: "SAV", label: "SAV", bgColor: "bg-orange-600", textColor: "text-orange-600" },
    { value: "Annulé", label: "Annulé", bgColor: "bg-red-600", textColor: "text-red-600" },
    { value: "Incompatible", label: "Incompatible", bgColor: "bg-gray-500", textColor: "text-gray-600" },
]

const getbgColorForStatut = (value: string): string => {
    const statutItem = statutItems.find(item => item.value === value);
    return statutItem ? statutItem.bgColor : "";
};

type Props = {
    event: Event;
    index: number;
    currentDay: moment.Moment;
}

function RdvCardDay({ event, index, currentDay }: Props) {

    const router = useRouter();

    const [evenement, setEvenement] = useState<Event>(event);

    const [newStatut, setNewStatut] = useState<string | undefined>("");
    const [modalStatutVisible, setModalStatutVisible] = useState(false);


    const [bgColorStatut, setBgColorStatut] = useState<string | undefined>(newStatut ? getbgColorForStatut(newStatut) : "");



    /* const openWaze = (address: any) => {
      const url = `waze://?q=${address}`;
  
      Linking.canOpenURL(url)
        .then((supported) => {
          if (!supported) {
            Alert.alert("Waze n'est pas installé", "Veuillez installer Waze pour utiliser cette fonctionnalité.");
          } else {
            return Linking.openURL(url);
          }
        })
        .catch((err) => console.error('An error occurred', err));
    }; */

    const handleEditEvent = async () => {
        try {
            const currentEvent = await localStorage.getItem('event');
            if (currentEvent) {
                await localStorage.mergeItem('event', JSON.stringify(evenement));
            }
            else {
                try {
                    localStorage.setItem('event', JSON.stringify(evenement));
                } catch (error) {
                    console.log(error);
                }
            }
        } catch (error) {
            console.log(error);
        }
        router.push('/edit-event');
    }

    useEffect(() => {
        const setStatut = () => {
            setNewStatut(evenement.statut);
            setBgColorStatut(getbgColorForStatut(evenement.statut || ""));
        }
        setStatut();
    }, [evenement.statut]);


    useEffect(() => {

        const channelUpdate = supabaseClient.channel('planning_db_update')
            .on('postgres_changes', {
                event: 'UPDATE',
                schema: 'public',
                table: 'planning'
            },
                //(payload: any) => console.log('Change received!', payload.new))
                (payload: any) => payload.new.date_installation === payload.new.date_installation ? setEvenement(payload.new) : null)
            .subscribe();

        return () => {
            supabaseClient.removeChannel(channelUpdate)

        }
    }, [supabaseClient, evenement, setEvenement])


    return (
        <div className="p-6 mb-8 rounded-xl bg-gray-100">
            <div
                className={`${bgColorStatut} flex-row justify-center mb-4 px-2 py-3 rounded-xl`}
                onClick={() => setModalStatutVisible(!modalStatutVisible)}
            >
                 <h3 className={`text-xl font-psemibold text-white text-center`}>{newStatut}</h3>
            </div>
            <div className="flex justify-between font-semibold text-lg flex-row">
                <h3 className="text-xl font-psemibold">{evenement.code_postal}</h3>
                <h3 className="text-xl font-psemibold">{evenement.heure_installation}</h3>
            </div>
            <div className="text-sm">
                <h3 className="my-1 text-lg font-pmedium">{evenement.nom.toUpperCase()} {evenement.prenom?.toUpperCase()}</h3>
                <Link href={`tel:${evenement.tel}`} className="text-lg font-pmedium">
                    {evenement.tel}
                </Link>
                <div
                    className="my-1"
                //   onPress={() => openWaze(evenement?.adresse + evenement?.code_postal + evenement?.ville)}
                >
                    <h3 className="text-lg">{evenement.adresse?.toUpperCase()}</h3>
                    <h3 className="text-lg">{evenement.code_postal}  {evenement.ville?.toUpperCase()}</h3>
                </div>
                <div className="my-1">
                    <h3 className="text-lg">Type de radiateur : {evenement.type_chauffage === "Electrique" ? "ELECTRIQUE" : "HYDRO"}</h3>
                    <h3 className="text-lg">Nombre de radiateur : {evenement.nombre_radiateur}</h3>
                </div>
                <div
                    className="flex-row justify-start"
                    onClick={handleEditEvent}
                >
                    {/* <MaterialIcons name="edit-calendar" size={24} color="black" /> */}
                </div>
            </div>
            {/* <ModalStatut
        newStatut={newStatut}
        setNewStatut={setNewStatut}
        modalStatutVisible={modalStatutVisible}
        setModalStatutVisible={setModalStatutVisible}
        event={evenement}
        setBgColorStatut={setBgColorStatut}
      /> */}
        </div>
    )
}

export default RdvCardDay