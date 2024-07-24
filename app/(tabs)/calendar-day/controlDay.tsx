import React from 'react'
import moment from 'moment'
import 'moment/locale/fr';
moment.locale('fr');
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

type Props = {
    changeDay: (action: 'add' | 'subtr') => void;
    currentDay: moment.Moment;
}

const ControlDay = ({changeDay, currentDay}: Props) => {
 
    const isSameDay = moment().isSame(currentDay, 'day');
    //Alert.alert(moment(currentDay).format('DD/MM/YYYY'));

  return (
    <div className="flex justify-between items-center w-full flex-row bg-white py-4">
        <div  
        onClick={() => changeDay('subtr')}
        >
            <HiChevronLeft className="w-8 h-8"/>
        </div>
        <h3 className={`${isSameDay && "text-blue-700"} font-semibold text-xl`}>{currentDay.format('DD MMMM YYYY')}</h3>
        <div  
            onClick={() => changeDay('add')}
        >
            <HiChevronRight className="w-8 h-8"/>
        </div>
    </div>
  )
}

export default ControlDay