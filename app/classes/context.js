class Context {
  constructor (req, res) {
    this.req = req
    this.res = res
    this.crown_dependencies = ['territory:gg', 'territory:je']
  }

  get_phase () {
    this.phase = this.req.session.data['phase']
  }

  handle_form_data () {
    switch (this.phase) {
      case 'type-of-trade':
        if (this.req.session.data['type-of-trade'] == 'import') {
          this.res.redirect('/import/origin-country')
        } else {
          this.res.redirect('/export/origin-country')
        }
        break

      case 'import-origin-country':
        var import_origin_country = this.req.session.data['import-origin-country']
        if (this.crown_dependencies.includes(import_origin_country)) {
          this.res.redirect('/import/crown-dependencies')
        } else {
          this.res.redirect('/import/destination-country')
        }
        break

      case 'export-origin-country':
        var export_origin_country = this.req.session.data[
          'export-origin-country'
        ]
        if (export_origin_country == 'gb') {
          this.res.redirect('/export/destination-country')
        } else if (export_origin_country == 'ni') {
          this.res.redirect('/export/destination-country')
        } else if (export_origin_country == 'ci') {
          this.res.redirect('/export-crown-dependencies')
        }
        break

      case 'export-destination-country':
        var export_destination_country = this.req.session.data['country']
        if (this.crown_dependencies.includes(export_destination_country)) {
          this.res.redirect('/export/crown-dependencies')
        } else {
          this.res.redirect('/export/export-commodity')
        }
        break

      case 'import-destination-country':
        this.res.redirect('/import/date')
        break
    }
  }

  get_location_graph() {
    var type_of_trade = this.req.session.data['type-of-trade'];
    var export_origin_country = this.req.session.data['export-origin-country'];
    if (type_of_trade == "import") {

    } else {
        if (export_origin_country == "ni") {
            this.location_graph_file = "location-autocomplete-graph-export-ni.json"
        } else {
            this.location_graph_file = "location-autocomplete-graph-export.json"
        }
    }
  }

  check_import_origin() {
    var import_origin_country = this.req.session.data['import-origin-country'];
    if (import_origin_country == "territory:xi") {
        this.show_ni_import_destination_screen = true;
    } else {
        this.show_ni_import_destination_screen = false;
    }
  }
}
module.exports = Context
