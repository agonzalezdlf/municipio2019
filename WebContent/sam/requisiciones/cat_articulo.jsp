<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<title>Catálogo General de Artículos</title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<link rel="stylesheet" href="../../include/css/bootstrap-3.3.7.css" type="text/css" />
<link rel="stylesheet" href="../../include/css/bootstrap2.css" type="text/css" />
<link rel="stylesheet" href="../../include/js/componentes/jquery.alerts.css" type="text/css">
	<link rel="stylesheet" href="../../include/js/sweetalert2/7.0/sweetalert2.min.css" type="text/css">
<link rel="stylesheet" href="../../include/css/bootstrap-select.css" type="text/css">
<script type="text/javascript" src="../../include/js/jquery-2.1.3.js"></script>
<script type="text/javascript" src="../../dwr/engine.js"></script>
<script type="text/javascript" src="../../dwr/util.js"></script>
<script type="text/javascript" src="../../include/js/componentes/jquery.alerts.js"></script>
<script type="text/javascript" src="cat_articulo.js?x=<%=System.currentTimeMillis()%>"></script>
<script type="text/javascript" src="../../include/js/toolSam.js"></script>
<script type="text/javascript" src="../../dwr/interface/controladorArticulosRemoto.js"></script>

<script type="text/javascript" src="../../include/js/bootstrap-select.js"></script>
<script type="text/javascript" src="../../include/js/bootstrap-3.3.7.js"></script>

<script type="text/javascript" src="../../include/js/sweetalert2/7.0/sweetalert2.all.js"></script>
<script type="text/javascript" src="../../include/js/sweetalert2/7.0/core-js-2.4.1.js"></script>

<!-- <link rel="stylesheet" href="../../include/css/estilosam.css" type="text/css"> 
<link rel="stylesheet" href="../../include/js/autocomplete/jquery.autocomplete.css" type="text/css" />
<link type="text/css" href="../../include/js/utilsJquery/jquery-ui-1.7.1.custom.css" rel="stylesheet" />
<script type="text/javascript" src="../../include/js/autocomplete/autompleteVarios.js"></script>
<script type="text/javascript" src="../../dwr/interface/autocompleteDiversosRemoto.js"></script> 
<script type="text/javascript" src="../../include/js/jquery-1.3.2.min.js"></script>
<script type="text/javascript" src="../../include/js/autocomplete/autompleteVarios.js"></script>
<script type="text/javascript" src="../../include/js/autocomplete/jquery.autocomplete.js"></script>
<script type="text/javascript" src="../../include/js/jquery-impromptu.2.3.js"></script>
<script type="text/javascript" src="../../include/js/componentes/componentes.js"></script>
<script type="text/javascript" src="../../include/js/utilsJquery/jquery-ui-1.7.1.custom.min.js"></script>
<script type="text/javascript" src="../../include/js/jquery.maxlength.js"></script>
<script type="text/javascript" src="../../include/js/jquery.bestupper.min.js"></script>
<script type="text/javascript" src="../../include/js/utilsJquery/jquery-ui-1.7.1.custom.min.js"></script>
<link rel="stylesheet" href="../../include/js/utilsJquery/jquery-ui-1.7.1.custom.css" type="text/css" />
<link rel="stylesheet" href="../../include/js/autocomplete/jquery.autocomplete.css" type="text/css" />
<link rel="stylesheet" href="../../include/css/sweetalert2.css" type="text/css"> 
<script type="text/javascript" src="../../include/js/sweetalert2.js"></script>
<link rel="stylesheet" href="../../include/js/jquery.tabs/jquery.tabs.css" type="text/css" media="print, projection, screen">
-->
</head>
<body>
	<form name="forma" id="forma" method="post" action="" onSubmit="return false;">
		<input type="hidden" name="id" id="id" />
			
		<div class="row col-md-offset-2">
			<h1 class="h1-encabezado">Administración - Catálogo General de Artículos</h1>
		</div>
		<div class="well">
			<!-- Descripción articulo -->
			<div class="row">
				<div class="form-group">
					<label for="descripcion" class="col-md-2 control-label">Descripci&oacute;n:</label>
					<div class="col-md-2 form-group">
						<input name="descripcion" type="text" class="form-control input-sm" id="descripcion" style="width: 447px" onBlur="upperCase(this)" />
					</div>
				</div>
			</div>
			<!-- Descripción articulo -->
			<!-- Uniad de medida -->
			<div class="row">
				<div class="form-group">
					<label for="cbounimed" class="col-md-2 control-label">Ultima Unidad de Medida:</label>
					<div class="col-sm-3 form-group">
						<select class="selectpicker form-control input-sm m-b" data-live-search="true" style="width: 100%" id="cbounimed" name="cbounimed" title="Seleccione unidad de medida...">
							<c:forEach items="${unidmedida}" var="item" varStatus="status">
								<option value='<c:out value="${item.CLV_UNIMED}"/>'<c:if test='${item.CLV_UNIMED==cbounimed}'>selected</c:if>>
								<c:out value='${item.unidmedida}' />
								</option>
							</c:forEach>
						</select>
						<input name="CVE_UNIDAD_MEDIDA" type="hidden" id="CVE_UNIDAD_MEDIDA" value="" />
					</div>
				</div>
			</div>
			<!-- Uniad de medida -->
			<!-- Ultimo precio -->
			<div class="row">
				<div class="form-group">
					<label for="precio" class="control-label col-sm-2">Ultimo Precio :</label>
					<div class="col-md-2 form-group">
						<input name="precio" type="text" class="form-control input-sm" id="precio" />
					</div>
				</div>
			</div>
			<!-- Ultimo precio -->
			<!--Beneficiario-->
             <div class="row">
             	<div class="form-group">
                	<div class="control-label col-sm-2 ">Seleccione un Beneficiario:</div>
                    <div class="form-group col-sm-3">
                        <select name="xBeneficiario" class="selectpicker form-control input-sm m-b" data-live-search="true" id="xBeneficiario" style="width:100%" title="Seleccione un beneficiario">
                          <c:forEach items="${beneficiarios}" var="item" varStatus="status">
                                <option value='<c:out value="${item.clv_benefi}"/>'
                                <c:if test='${item.clv_benefi==map.CLV_BENEFI}'>selected</c:if>><c:out value='${item.NCOMERCIA}'/>
                          </c:forEach>
                        </select>
                    </div>
                </div>
            </div>
            <!--Beneficiario-->
            <!-- Inventariable -->
            <div class="row">
				<div class="form-group">
					<label for="inventariable" class="col-md-2 control-label">Inventariable :</label>
					<div class="col-md-2 form-group">
						<input name="inventariable" type="checkbox" id="inventariable" value="1" checked> Si
					</div>
				</div>
			</div>
			<!-- Inventariable -->
			<!-- Consumible -->
			<div class="row">
				<div class="form-group">
					<label for="consumible" class="col-md-2 control-label">Consumible</label>
					<div class="col-md-2 form-group">
						<input name="consumible" type="checkbox" id="consumible" value="1" checked> Si
					</div>
				</div>
			</div>
			<!-- Consumible -->
			<!-- Estatus -->
			<div class="row">
				<div class="form-group">
					<label for="estatus" class="col-md-2 control-label">Estatus</label>
					<div class="col-md-2 form-group">
						<input name="estatus" type="checkbox" id="estatus" value="1" checked>
					</div>
				</div>
			</div>
			<!-- Estatus -->
			<!-- Buttons -->
			<div class="row">
				<div class="form-group">
					<label for="btnGuardar" class="col-md-2 control-label"></label>
					<div class="col-md-2 form-group">
						<input name="btnGuardar" type="button" class="btn btn-success" id="btnGuardar" style="width: 90px" value="Guardar" /> 
						<input name="btnLimpiar" type="button" class="btn btn-primary" id="btnLimpiar" style="width: 90px" value="Limpiar" />
					</div>
				</div>
			</div>
			<!-- Buttons -->
		</div><!-- Cierre well -->
		<br>
		<br>
		<!-- Search -->
		<div class="row">
			<div class="form-group">
				<label for="" class="col-md-2 control-label"></label>
				<div class="col-md-1">
					<input name="btnGuardar2" type="button" class="btn btn-buscar" style="width:150px" id="btnGuardar2" value="Buscar" />
				</div>
				<div class="col-md-3 form-group">
					<input type="text" name="alfabetico" class="form-control" id="alfabetico">
				</div>
			</div>
		</div>
		<!-- Search -->
	
		<div class="row">
			<div class="form-group col-sm-12">
				<table style="width:100% !important; margin: auto;" class="listasDetalles table table-hover" id="tablaArticulos">
					<thead>
						<tr id="">
							<th width="3%" height="20" align="center"><img src="../../imagenes/cross.png" width="16" height="16" onClick="eliminarDato()" style='cursor: pointer;'></th>
							<th width="33%" align="center">Descripción</th>
							<th width="21%" align="center">Ultimo Beneficiario</th>
							<th width="15%" align="center">Unida de Medida</th>
							<th width="12%" align="center">Precio</th>
							<th width="10%" align="center">Estatus</th>
							<th width="6%" align="center"></th>
						</tr>
					</thead>
					<tbody>
					</tbody>
				</table>
			</div>
		</div>		
	</form>
</body>