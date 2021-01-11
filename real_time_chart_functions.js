function initialize_chart(vechile_id){

      async function getTemperature(){
        var promise_result=readItem_3(vechile_id);
        var temperature_value;
        await promise_result.then(function(result) {
            temperature_value=result;
        });

        temperature_value;
      }

      $(async function () {
        /*
         * Flot Interactive Chart
         * -----------------------
         */
        // We use an inline data source in the example, usually data would
        // be fetched from a server
        var data        = [],
            totalPoints = 10

        async function getRandomData() {

          if (data.length > 0) {
            data = data.slice(1)
          }

          // Do a random walk
          while (data.length < totalPoints) {

            /*var prev = data.length > 0 ? data[data.length - 1] : 50,
                y    = prev + Math.random() * 10 - 5

            if (y < 0) {
              y = 0
            } else if (y > 100) {
              y = 100
            }*/

            var promise_result=readItem_3(vechile_id);
            var temperature_value;
            await promise_result.then(function(result) {
                temperature_value=result;
            });

            temperature_value;

            //console.log(getTemperature());

            data.push(temperature_value)
            //console.log(data);
          }

          // Zip the generated y values with the x values
          var res = []
          for (var i = 0; i < data.length; ++i) {
            res.push([i, data[i]])
            console.log(res);
          }

          return res
        }

        var dataxy= await getRandomData();

        var interactive_plot = $.plot('#interactive', [
            {
              data: dataxy,
            }
          ],
          {
            grid: {
              borderColor: '#f3f3f3',
              borderWidth: 1,
              tickColor: '#f3f3f3'
            },
            series: {
              color: '#3c8dbc',
              lines: {
                lineWidth: 2,
                show: true,
                fill: true
              },
              points    : {
                show: true
              }
            },
            yaxis: {
              min: 0,
              max: 150,
              show: true
            },
            xaxis: {
              show: false
            }
          }
        )

        var updateInterval = 1000 //Fetch data ever x milliseconds
        var realtime       = 'on' //If == to on then fetch data every x seconds. else stop fetching

        async function update() {
          var data_set = await getRandomData()
          interactive_plot.setData([data_set])
          console.log(interactive_plot.getData())
          // Since the axes don't change, we don't need to call plot.setupGrid()
          await interactive_plot.draw()
          if (realtime === 'on') {
            setTimeout(update, updateInterval)
          }
        }

        //INITIALIZE REALTIME DATA FETCHING
        if (realtime === 'on') {
          update()
        }
        //REALTIME TOGGLE
        $('#realtime .btn').click(function () {
          if ($(this).data('toggle') === 'on') {
            realtime = 'on'
          }
          else {
            realtime = 'off'
          }
          update()
        })
        /*
         * END INTERACTIVE CHART
         */
       })
}
