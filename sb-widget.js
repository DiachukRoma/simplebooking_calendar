class Widget {
    months_EN = {
        1: 'January',
        2: 'February',
        3: 'March',
        4: 'April',
        5: 'May',
        6: 'June',
        7: 'July',
        8: 'August',
        9: 'September',
        10: 'October',
        11: 'November',
        12: 'December',
    }

    days_EN = {
        monday: 'Mo',
        tuesday: 'Tu',
        wednesday: 'We',
        thursday: 'Th',
        friday: 'Fr',
        saturday: 'Sa',
        sunday: 'Su',
    }

    days_HE = {
        monday: 'ב',
        tuesday: 'ג',
        wednesday: 'ד',
        thursday: 'ה',
        friday: 'ו',
        saturday: 'שבת',
        sunday: 'א',
    }

    constructor(currentDate = new Date(), nextDate = new Date()) {
        nextDate.setMonth(currentDate.getMonth() + 1);

        this.createCalendar(currentDate.getFullYear(), currentDate.getMonth());
        this.createCalendar(nextDate.getFullYear(), nextDate.getMonth());
    }

    createCalendar(year, month) {
        let d = new Date(year, month);
        let singleCalendar = document.createElement('div');
        let days = (document.querySelector('html').getAttribute('lang') == 'en-US') ? this.days_EN : this.days_HE;
        let table = `
            <h2>${this.months_EN[month+1]} ${year}</h2>
            <table>
                <tr>
                    <th>${days.monday}</th>
                    <th>${days.tuesday}</th>
                    <th>${days.wednesday}</th>
                    <th>${days.thursday}</th>
                    <th>${days.friday}</th>
                    <th>${days.saturday}</th>
                    <th>${days.sunday}</th>
                </tr>
                <tr>`;

        for (let i = 0; i < this.getDay(d); i++) {
            table += '<td></td>'
        }
        while (d.getMonth() == month) {
            table += '<td>' + d.getDate() + '</td>'
            if (this.getDay(d) % 7 == 6) {
                table += '</tr><tr>'
            }
            d.setDate(d.getDate() + 1)
        }
        if (this.getDay(d) != 0) {
            for (let i = this.getDay(d); i < 7; i++) {
                table += '<td></td>'
            }
        }
        table += '</tr></table>';
        singleCalendar.classList.add(`calendar__${month}`)
        singleCalendar.innerHTML = table;
        document.querySelector('.calendars_root').append(singleCalendar);
    }

    getDay(date) {
        let day = date.getDay()
        if (day == 0) day = 7
        return day - 1
    }
}
let widget = new Widget();