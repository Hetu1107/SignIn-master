import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Pie } from 'react-chartjs-2';

const Chart = ()=>{
    return(
        <div class="chart">
            <Pie 
                data = {{
                    labels: ['hetu', 'mohit', 'zaid','xyz','he','fr','he'],
                    datasets: [
                        {
                            label: '# no. of votes',
                            data: [20, 10, 3,20,10,20,50],
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)'
                            ],
                            borderWidth: 1
                        },
                        // {
                        //     label: 'Quantity',
                        //     data: [100, 104, 67, 87, 27],
                        //     backgroundColor: [
                        //         'rgba(255, 99, 132, 1)',
                        //         'rgba(54, 162, 235, 1)',
                        //         'rgba(255, 206, 86, 1)',
                        //         'rgba(75, 192, 192, 1)',
                        //         'rgba(153, 102, 255, 1)',
                        //         'rgba(255, 159, 64, 1)'
                        //     ],
                        //     borderColor: [
                        //         'rgba(255, 99, 132, 0.4)',
                        //         'rgba(54, 162, 235, 0.4)',
                        //         'rgba(255, 206, 86, 0.4)',
                        //         'rgba(75, 192, 192, 0.4)',
                        //         'rgba(153, 102, 255, 0.4)',
                        //         'rgba(255, 159, 64, 0.4)'
                        //     ],
                        //     borderWidth: 10
                        // }
                    ]
                }}
                height={400}
                width = {600}
                options={{
                    maintainAspectRatio: false,
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                    beginAtZero: true,
                                }
                            }
                        ]
                    }
                }}
            />
        </div>
    );
};


export default Chart;
