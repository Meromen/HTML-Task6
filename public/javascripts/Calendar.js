calendar = {};

calendar.MONTH_NAME=[
    'Январь', 'Февраль', 'Март', 'Апрель',
    'Май', 'Июнь', 'Июль', 'Август',
    'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
];

calendar.DAY_NAME=[
    'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'
];

calendar.CALENDAR_ID='calendar_table';
calendar.ACTION_ID = 'actions_table';

calendar.selectDate = function(day,month,year) {
    calendar.selectedDate={
        'Day' : day,
        'Month' : month,
        'Year' : year
    };
    calendar.drawCalendar(month,year);
    calendar.drawAction(calendar.getAction(day, month), day, month);
};

calendar.drawCalendar = function(month,year) {
    let tmp='';
    tmp+='<table class="calendar" cellspacing="0" cellpadding="0">';

    tmp+='<tr>';
    tmp+='<td class="navigation" '+
        'onclick="calendar.drawCalendar('+(month>1?(month-1):12)+
        ','+(month>1?year:(year-1))+');">&#9668;<\/td>';
    tmp+='<td colspan="5" class="navigation" '+
        'onclick="calendar.drawCalendar('+
        calendar.selectedDate.Month+','+
        calendar.selectedDate.Year+');">'+
        calendar.MONTH_NAME[(month-1)]+'&nbsp;-&nbsp;'+year+'<\/td>';
    tmp+='<td class="navigation" '+
        'onclick="calendar.drawCalendar('+(month<12?(month+1):1)+
        ','+(month<12?year:(year+1))+');">&#9658;<\/td>';
    tmp+='</tr>';

    tmp+='<tr>';
    tmp+='<th>'+calendar.DAY_NAME[0]+'<\/th>';
    tmp+='<th>'+calendar.DAY_NAME[1]+'<\/th>';
    tmp+='<th>'+calendar.DAY_NAME[2]+'<\/th>';
    tmp+='<th>'+calendar.DAY_NAME[3]+'<\/th>';
    tmp+='<th>'+calendar.DAY_NAME[4]+'<\/th>';
    tmp+='<th class="holiday">'+calendar.DAY_NAME[5]+'<\/th>';
    tmp+='<th class="holiday">'+calendar.DAY_NAME[6]+'<\/th>';
    tmp+='<\/tr>';

    let total_days = 32 - new Date(year, (month-1), 32).getDate();
    let total_days_for_anther_month = 32 - new Date(year, (month-2), 32).getDate();

    let start_day = new Date(year, (month-1), 1).getDay();
    if (start_day===0) { start_day=7; }
    start_day--;

    let final_index=Math.ceil((total_days+start_day)/7)*7;

    let day=1;
    let index=0;
    let daysNextMounth = 0;
    do {
        if (index%7===0) {
            tmp+='<tr>';
        }
        if (index<start_day) {
            tmp+='<td class="grayed">'+(total_days_for_anther_month-(start_day-index-1))+'<\/td>';
        } else if(index>=(total_days+start_day)){
            daysNextMounth++;
            tmp+='<td class="grayed">'+daysNextMounth+'<\/td>';
        } else {
            let class_name='';
            if (calendar.selectedDate.Day===day &&
                calendar.selectedDate.Month===month &&
                calendar.selectedDate.Year===year) {
                class_name='selected';
            } else if (index%7===6 || index%7===5) {
                class_name='holiday';
            }
            if ( day === new Date().getDate() &&
                month === new Date().getMonth()+1 &&
                year === new Date().getFullYear() &&
                class_name !=='selected') {
                class_name = 'today';
            }
            tmp+='<td class="'+class_name+'" '+
                'onclick="calendar.selectDate('+
                day+','+month+','+year+');">'+day+'<\/td>';
            day++;
        }

        if (index%7===6) {
            tmp+='<\/tr>';
        }
        index++;
    }
    while (index<final_index);

    tmp+='<\/table>';

    document.getElementById(calendar.CALENDAR_ID).innerHTML=tmp;
};

calendar.selectedDate={
    'Day' : null,
    'Month' : new Date().getMonth()+1,
    'Year' : new Date().getFullYear()
};

calendar.drawCalendar(
    calendar.selectedDate.Month,
    calendar.selectedDate.Year
);

calendar.actionsMemory = {};

calendar.getAction = function (day, month) {
    return day !== null && calendar.actionsMemory[month - 1+"."+day - 1] !== undefined;
};

calendar.drawAction = function (isAction, day, month) {
    let tmp ='<p>'+day+'.'+month+'</p>';
    if (isAction) {
        tmp +='<p>'+calendar.actionsMemory[month-1+"."+day-1]+'</p>';
    } else {
        tmp += '<p>Нет событий</p>'
    }
    tmp +='<form name="inputAction"><input type="text" name="inputText" value="" placeholder="Введите событие"></form>';
    tmp += '<input type="button" onclick="calendar.setActions('+day+','+month+')" value="Изменить">';
    document.getElementById(calendar.ACTION_ID).innerHTML = tmp;
};

calendar.setActions = function (day, month) {
    calendar.actionsMemory[month-1+"."+day-1] = document.inputAction.inputText.value;
    calendar.drawAction(true, day, month);
};