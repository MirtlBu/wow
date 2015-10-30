(function() {

    new WOW().init();

    $('.slick').slick({
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
        {
          breakpoint: 1200,
          settings: {
            arrows: true,
            slidesToShow: 4
          }
        },
        {
          breakpoint: 768,
          settings: {
            arrows: true,
            slidesToShow: 3
          }
        },
        {
          breakpoint: 480,
          settings: {
            arrows: true,
            slidesToShow: 2
          }
        }
      ]
    });

    var numRandom = function() {
        return Math.floor(Math.random()*110) + 5;
    }

    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    function dataMaker() {
        var year = [];
        months.forEach(function(v, i) {
            i++;
            if(i < 10) {
                i = '0' + i;
            }
            year.push( {
                month: v,
                ind: i,
                num: numRandom()
            } );
        });
        return year;
    }

    var chartdata = {
        '2013': dataMaker(),
        '2014': dataMaker(),
        '2015': dataMaker()
    }

    var w = $('.bar-chart').width(),
        h = 150;

    var svg = d3.select('.bar-chart')
        .append('svg')
        .attr('width', w)
        .attr('height', h);

    function showChart(year) {
        var bw = w / year.length;
        var elems = svg.selectAll('rect');

        if(elems[0].length > 1) {
            svg.selectAll('.chart__rect')
               .data(year)
               .transition()
               .attr('y', function(d) {
                    return h - (d.num) - 25;
               })
               .attr('height', function(d) {
                    return d.num;
               });
        }
        else {

            function elem(e) {
                return svg.selectAll('stuff')
                            .data(year)
                            .enter()
                            .append(e)
                            .attr('fill', '#fff')
                            .attr('x', function(d, i) {
                                return e == 'rect' ? i * bw : i * bw + (bw - bw/10) / 2
                            })
                            .attr('width', function(d) {
                                return e == 'rect' ? bw - bw/10 : 0
                            })
                            .attr('y', function(d) {
                                return e == 'rect' ? h - 25 : h - 5
                            })
                            .attr('height', function(d) {
                                return 0;
                            })
                            .attr('text-anchor', function(d) {
                                return e !== 'rect' ? 'middle' : 0
                            });
            }

            elem('rect').attr('class', 'chart__rect')
                        .transition()
                        .attr('y', function(d) {
                            return h - (d.num) - 25;
                        })
                        .attr('height', function(d) {
                            return d.num;
                        });

            elem('text').attr('class', 'chart__ind')
                        .text(function(d) {
                            return d.ind;
                        });

            elem('text').attr('class', 'chart__month')
                        .text(function(d) {
                            return d.month;
                        });
        }
    }

    showChart(chartdata['2013']);

    $('.charts').on('click', '.chart__control', function() {
        $('.chart__control').removeClass('chart__control--active');
        $(this).addClass('chart__control--active');
        var year = $(this).attr('data-year');
        showChart(chartdata[year]);
    });

})()