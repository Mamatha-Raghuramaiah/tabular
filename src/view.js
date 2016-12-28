tabular.View = function(element, options) {
  this._element = element;
  this._options = options;
  this._init();
  return this._element;
};

tabular.View.prototype = {
  _init: function() {
    this._bind();
    this._setup();
    this._element.trigger('model:fetch');
  },

  _setup: function() {
    this._element.addClass('tabular');
    this._table = $('<table/>').appendTo(this._element);
    this._addHeading();
    this._tbody = $('<tbody/>').appendTo(this._table);
  },

  _addHeading: function() {
    if (this._options.addHeading) {
      this._options.addHeading(this._element, this._table, this._options);
      return;
    }
    var ths = $.map(this._options.columns, function(column) {
      return '<th>' + column.title + '</th>';
    });
    this._table.append('<thead><tr>' + ths.join('') + '</th></thead>');
  },

  _render: function(e, response) {
    var self = this;
    var rows = $.map(response.data, function(datum) {
      return self._processRow(datum);
    });
    this._tbody.html(rows);
  },

  _processRow: function(rowData) {
    var tds = $.map(this._options.columns, function(column) {
      return '<td>' + rowData[column.name] + '</td>';
    });
    return '<tr>' + tds.join('') + '</tr>';
  },

  _showLoading: function() {
    console.log('show loading')
  },

  _bind: function() {
    this._element.on('model:success', $.proxy(this, '_render'));
  }
};
