<%@ page contentType="text/html;charset=utf-8"  %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page import="java.util.Date"%> 
<!DOCTYPE HTML>
<html>
<head>
<title>Catalogo de Grupos</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>

<script type="text/javascript" src="../../include/js/jquery-2.1.3.min.js"></script>
<script type="text/javascript" src="../../include/js/bootstrap-3.3.7.js"></script>
<script type="text/javascript" src="../../include/css/bootstrap2.css"></script>

<link rel="stylesheet" href="../../include/js/sweetalert2/7.0/sweetalert2.min.css" type="text/css">
<script type="text/javascript" src="../../include/js/sweetalert2/7.0/sweetalert2.all.js"></script>
<script type="text/javascript" src="../../include/js/sweetalert2/7.0/core-js-2.4.1.js"></script>
<link rel="stylesheet" href="../../include/css/estilosam.css" type="text/css">
<script type="text/javascript" src="../../include/css/bootstrap-datetimepicker-master/js/moment-with-locales-2.9.0.js"></script>
<link rel="stylesheet" href="../../include/css/bootstrap-datetimepicker-master/css/bootstrap-datetimepicker-4.15.35.css" type="text/css">
<script type="text/javascript" src="../../include/css/bootstrap-datetimepicker-master/js/bootstrap-datetimepicker-4.15.35.js"></script>

<link rel="stylesheet" href="../../include/css/bootstrap-select_1.13.9.css" type="text/css">
<script type="text/javascript" src="../../include/js/bootstrap-select.min_1.13.9.js"></script>
<script type="text/javascript" src="../../include/js/jquery-impromptu.2.3.js"></script>

<script type="text/javascript" src="../../dwr/interface/controladorBeneficiarioRemoto.js"> </script>
<script type='text/javascript' src='../../dwr/util.js'></script>
<script type="text/javascript" src="../../dwr/engine.js"> </script>
  
<script type="text/javascript" src="beneficiario.js?x=<%=System.currentTimeMillis()%>"></script>
<script type="text/javascript" src="../../include/js/toolSam.js?x=<%=System.currentTimeMillis()%>"></script>
<script type="text/javascript" src="../../include/js/presupuesto/presupuesto.js"></script>
<link rel="stylesheet" href="../../include/js/jquery.tabs/jquery.tabs.css" type="text/css" media="print, projection, screen">
<link rel="stylesheet" href="../../include/css/bootstrap-3.3.7.css" type="text/css">

<link rel="stylesheet" href="../../include/css/style-tabs.css" type="text/css"/>
<body leftmargin="0" topmargin="0" marginwidth="0" marginheight="0" >
<form name="forma" method="get" action="" onSubmit=" return false" >


<div id="tabuladores">
	 <div class="panel with-nav-tabs panel-primary">
	 	 <div class="panel-heading">
	 	 	<ul class="nav nav-tabs responsive" id="tabsBeneficiariosPane" name="tabsBeneficiariosPane">
                <li class="active"><a href="#fragment-general" data-toggle="tab">Información general</a></li>
                <li><a href="#fragment-representante" data-toggle="tab">Datos para contacto</a></li>
                <li><a href="#fragment-fiscal" data-toggle="tab">Domicilio fiscal</a></li>
                <li><a href="#fragment-bancario" data-toggle="tab">Datos bancarios</a></li>
                <li><a href="#fragment-giro" data-toggle="tab">Giro</a></li>
                <li id="tabsrubro" class="nav-item disabled"><a href="#fragment-rubro" data-toggle="tab">Rubros</a></li>
                <li id="tabsanexos" class="nav-item disabled"><a href="#fragment-tabsDoc" data-toggle="tab">Anexos</a></li>
             </ul>
	 	 </div>
	 	 
	 	    <div class="panel-body">
	 	     	<div class="tab-content">
	 	     		<!--Tab Información general-->
              		<div class="tab-pane fade in active" id="fragment-general">
              		 	<form class="form-horizontal">
              		 		 <!-- Mensaje -->
                    		 <div class="row">
                    		 	<div class="control-label col-sm-10"> Nota: (*) Requerido para nuevo beneficiario, (**) Requerido para nuevos funcionarios</div>
                    		 	<input type="hidden" name="idBenefi" id="idBenefi" value="<c:out value='${id}'/>">
                    		 </div>
                    		 <br>
                    		<!-- Tipo de Beneficiario -->
		                    <div class="row">
		                      <div class="form-group">
		                        <div class="control-label col-sm-3 ">**Régimen :</div>
		                        <div class="col-sm-3 form-group">
		                        	<select name="tipoBenefi" class="form-control" id="tipoBenefi" style="width:150px" >
								        <option value="0" <c:if test="${beneficiario.TIPOBENEFI==''}">selected</c:if>>[Seleccione]</option>
								        <option value="PF" <c:if test="${beneficiario.TIPOBENEFI=='PF'||beneficiario.TIPOBENEFI=='PR'||beneficiario.TIPOBENEFI=='CO'||beneficiario.TIPOBENEFI=='CM'}">selected</c:if>>Persona Fisica</option>
								        <option value="PM" <c:if test="${beneficiario.TIPOBENEFI=='PM'}">selected</c:if>>Persona moral</option>
								        <option value="MP" <c:if test="${beneficiario.TIPOBENEFI=='MP'}">selected</c:if>>Funcionario</option>
							      	</select>
		                        </div>
		                      </div>
		                    </div>
		                    <!-- Tipo de Beneficiario -->
		                    <div class="row">
		                      <div class="form-group">
		                        <div class="control-label col-sm-3 ">**Padron :</div>
		                        <div class="col-sm-3 form-group">
		                        	<select name="cbopadron" class="selectpicker form-control" id="cbopadron" style="width:180px" >
								        <option value="0" <c:if test="${beneficiario.PTIPO==''}">selected</c:if>>[Seleccione]</option>
								        <option value="CON" <c:if test="${beneficiario.PTIPO=='CON'}">selected</c:if>>Contratista</option>
								        <option value="ADQ" <c:if test="${beneficiario.PTIPO=='ADQ'}">selected</c:if>>Adquisiciones</option>
								    </select>
		                        </div>
		                        <div class="col-sm-3">
		                        	<input name="txtPPMC" type="text" class="form-control" id="txtPPMC" readonly placeholder="PADRON" value="<c:out value='${beneficiario.PPMC}'/>" maxlength="18" style="width:150px; margin-bottom: 1px;"  onBlur="upperCase(this)" />
		                        </div>
		                      </div>
		                    </div>
		                    <!-- RFC Y CURP  -->
		                    <div class="form-group row">
		                      	<div class="control-label col-sm-3">*R. F. C.:</div>
		                        <div class="col-sm-3">
		                        	<input name="rfc" type="text" class="form-control" id="rfc" placeholder="RFC" value="<c:out value='${beneficiario.RFC}'/>"  maxlength="15" onBlur="upperCase(this)" style="width:150px; margin-bottom: 1px;" />
		                        	<input type="hidden" name="idProveedor" id="idProveedor" value="<c:out value='${id}'/>">
		                        </div>
								<div id="persfis2">
		                      	<div class="col-sm-3">
		                        	<input name="txtcurp" type="text" class="form-control" id="txtcurp" placeholder="CURP" value="<c:out value='${beneficiario.CURP}'/>" maxlength="18" style="width:185px; margin-bottom: 1px;"  onBlur="upperCase(this)" />
		                        </div>
		                        </div>
		                    </div>
		                    <!-- Persona Moral -->
		                    <div id="otros">
		                    <!-- Razon social -->
		                    <div class="row">
		                      <div class="form-group">
		                        <div class="control-label col-sm-3">**Raz&oacute;n Social:</div>
		                        <div class="col-sm-3 form-group">
		                        	<input name="razonSocial" type="text" class="form-control" placeholder="Razón social" id="razonSocial" value="<c:out value='${beneficiario.NCOMERCIA}'/>" style="width:375px; margin-bottom: 1px;"  maxlength="100" onBlur="upperCase(this)" />
		                        </div>
		                      </div>
		                    </div>
		                    </div>
		                    <!-- DATOS DE CAPTURA PARA PERSONA FISCA  -->
		                    <div id="persfis">
		                    <!-- Razon comercial -->
		                    <div class="row">
		                      <div class="form-group">
		                        <div class="control-label col-sm-3">Raz&oacute;n Comercial:</div>
		                        <div class="col-sm-3 form-group">
		                        	<input name="razonComercial" type="text" class="form-control" placeholder="Razón comercial" id="razonComercial" value="<c:out value='${beneficiario.RACOMERCIAL}'/>" style="width:375px;margin-bottom: 1px;"  maxlength="100" onBlur="upperCase(this)" />
		                        </div>
		                      </div>
		                    </div>
		                    <!-- APELLIDOS  -->
		                    <div class="form-group row">
		                      	<div class="control-label col-sm-3">**Apellidos:</div>
		                        <div class="col-sm-3">
		                        	<input name="appaterno" type="text" class="form-control" id="appaterno" placeholder="Paterno" value="<c:out value='${beneficiario.AP_PATERNO}'/>" style="width:185px"  maxlength="100" onBlur="upperCase(this)" />
		                        </div>
		                      	 <div class="col-sm-3">
		                      	 	<input name="apmaterno" type="text" class="form-control" id="apmaterno" placeholder="Materno" value="<c:out value='${beneficiario.AP_MATERNO}'/>" style="width:185px"  maxlength="100" onBlur="upperCase(this)" />
		                         </div>
		                    </div>
		                    <!-- NOMBRE -->
		                    <div class="row">
		                      <div class="form-group">
		                        <div class="control-label col-sm-3">**Nombre(s):</div>
		                        <div class="col-sm-3 form-group">
		                        	<input name="txtnombre" type="text" class="form-control" id="txtnombre" placeholder="Nombre(s)" value="<c:out value='${beneficiario.NOMBRE}'/>" style="width:350px"  maxlength="100" onBlur="upperCase(this)" />
		                        </div>
		                      </div>
		                    </div>
		                    </div>
		                    <div class="row">
							    <div class="form-group">
							      <div class="control-label col-sm-3 ">*Estatus:</div>
							      <label class="switch" style="margin-left: 15px;">
										<input type="checkbox" name="chkstatus" id="chkstatus" />
										<span class="slider round"></span>
								   </label>
							    </div>
						    </div>
						     <div class="row">
							    <div class="form-group">
							    <div class="control-label col-sm-3 "></div>
							      	<input  name="cmdcerrar" type="button" class="btn btn-danger btn-sm" id="cmdcerrar"   value="Cerrar" style="width:150px" />
      								<input  name="cmdguardar" type="button" class="btn btn-success btn-sm" id="cmdguardar"   value="Guardar" style="width:150px" />
							    </div>
						    </div>
              		 	</form>
              		</div>
              		<!--Tab Representante-->
	 	     		<div class="tab-pane" id="fragment-representante">
	 	     			<form class="form-horizontal">
	 	     				<!-- Fecha alta SAT-->
		                    <div class="row">
		                      <div class="form-group">
		                        <div class="control-label col-sm-3">Fecha SAT:</div>
		                        <div class='col-sm-3'>
						        	<div class='input-group date' id='fecha_sat'>
						            	<input name="fechaSAT" type='text' class="form-control" id="fechaSAT" value="<c:out value='${beneficiario.FECHA_SAT}'/>" style="width:100%" maxlength="10" />
						                	<span class="input-group-addon">
						                    	<span class="glyphicon glyphicon-calendar"></span>
						                    </span>
						             </div>
						        </div>
						    </div>
		                    </div>
	 	     				<!-- Fecha alta -->
		                    <div class="row">
		                      <div class="form-group">
		                        <div class="control-label col-sm-3">Fecha alta:</div>
		                        <div class="col-sm-3">
		                        	<div class="input-group date" id='fechalta'>
			                              <input name="fecha_altab" type="text" class="form-control" id="fecha_altab" value="<c:out value='${beneficiario.FECHA_ALTA}'/>" style="width:100%" maxlength="10"/>
			                              <span class="input-group-addon">
			                                <span class="glyphicon glyphicon-calendar"></span>
			                              </span>
			                          </div>
		                        </div>
		                      </div>
		                    </div>
		                    <!-- Fecha baja -->
		                    <div class="row">
		                      <div class="form-group">
		                        <div class="control-label col-sm-3">Fecha baja:</div>
		                        <div class="col-sm-3">
		                        	<div class="input-group date" id="fechbaja">
			                              <input name="fecha_bajab" type="text" class="form-control" id="fecha_bajab" value="<c:out value='${beneficiario.FECHA_BAJA}'/>" style="width:100%" maxlength="10"/>
			                              <span class="input-group-addon">
			                                <span class="glyphicon glyphicon-calendar"></span>
			                              </span>
			                          </div>
		                        </div>
		                      </div>
		                    </div>
		                    <!-- Fecha baja -->
		                    <div class="row">
		                      <div class="form-group">
		                        <div class="control-label col-sm-3">Fecha modificación:</div>
		                        <div class="col-sm-3">
		                        	<div class="input-group date" id="fechmod">
			                              <input name="fecha_modifica" type="text" class="form-control" id="fecha_modifica" value="<c:out value='${beneficiario.MODIFICADA}'/>" style="width:100%" maxlength="10"/>
			                              <span class="input-group-addon">
			                                <span class="glyphicon glyphicon-calendar"></span>
			                              </span>
			                          </div>
		                        </div>
		                      </div>
		                    </div>	 	                                   
	 	     				<!-- Correo electronico  -->
	 	     				<div>
			                    <div class="row">
			                      <div class="form-group">
			                        <div class="control-label col-sm-3 ">Correo electronico:</div>
			                        <div class="col-sm-3">
			                        	<input name="txtemail" type="text" class="form-control" id="txtemail" value="<c:out value='${beneficiario.EMAIL}'/>" style="width:350px" maxlength="100" " />
			                        </div>
			                      </div>
			                    </div>
		                    </div>
		                    <!-- Telefonos  -->
	 	     				<div>
			                    <div class="row">
			                      <div class="form-group">
			                        <div class="control-label col-sm-3 ">Telefonos:</div>
			                        <div class="col-sm-3">
			                        	<input name="telefono" type="text" class="form-control" id="telefono" value="<c:out value='${beneficiario.TELEFONOS}'/>" style="width:350px" onkeypress=" return keyNumbero( event );" maxlength="100" onBlur="upperCase(this)" />
			                        </div>
			                      </div>
			                    </div>
		                    </div>
		                </form>
	 	     		</div>
	 	     		<!--Tab Fiscal-->
		 	    	<div class="tab-pane" id="fragment-fiscal">
		 	    		<form class="form-horizontal" id="formaCaptura">
		 	    			<!-- Vialidad -->
		                    <div class="row">
		                      <div class="form-group">
		                        <div class="control-label col-sm-3 ">*Vialidad</div>
		                        <div class="col-sm-3">
		                        	<select name="cbovialidad" class="selectpicker form-control" id="cbovialidad" style="width:350px" data-live-search="true" data-size="10" title="Seleccione una viliadad" >
								        <option value="0">[Seleccione]</option> 
								        	<c:forEach items="${vialidades}" var="item" varStatus="status">
								        <option value='<c:out value="${item.id_vialidad}"/>' <c:if test='${item.CLV_BNCSUC==beneficiario.vialidad}'> selected</c:if>><c:out value='${item.vialidad}'/> <c:out value='${item.PLAZA}'/> <c:out value='${item.SUCURSAL}'/></option>
								            </c:forEach>
								    </select> 
		                        </div>
		                      </div>
		                    </div>
		 	    			<!-- Calle -->
		                    <div class="row">
		                      <div class="form-group">
		                        <div class="control-label col-sm-3 ">*Calle</div>
		                        <div class="col-sm-3">
		                        	<input name="calle" type="text" class="form-control" id="calle" value="<c:out value='${beneficiario.DOMIFISCAL}'/>" style="width:350px" maxlength="60" onBlur="upperCase(this)" />
		                        </div>
		                      </div>
		                    </div>
		                    <!-- Numero exterior o interior  -->
		                    <div class="row">
		                    <div class="form-group row">
		                      	<div class="control-label col-sm-3">Número:</div>
		                        <div class="col-sm-3">
		                        	<input name="txtnumext" type="text" class="form-control" id="txtnumext" placeholder="Exterior" value="<c:out value='${beneficiario.NUM_EXTERIOR}'/>" style="width:155px"  maxlength="100" onBlur="upperCase(this)" />
		                        </div>
		                      	<div class="col-sm-3">
		                      	 	<input name="txtnumint" type="text" class="form-control" id="txtnumint" placeholder="Exterior" value="<c:out value='${beneficiario.NUM_INTERIOR}'/>" style="width:155px"  maxlength="100" onBlur="upperCase(this)" />
		                        </div>
		                    </div>
		                    </div>
		                    <!-- Colonia -->
		                    <div class="row">
		                      <div class="form-group">
		                        <div class="control-label col-sm-3 ">*Colonia :</div>
		                        <div class="col-sm-3">
		                        	<input name="colonia" type="text" class="form-control" id="colonia" value="<c:out value='${beneficiario.COLONIA}'/>" style="width:350px" maxlength="40" onBlur="upperCase(this)" />
		                        </div>
		                      </div>
		                    </div>
		                    <!-- Ciudad -->
		                    <div class="row">
		                      <div class="form-group">
		                        <div class="control-label col-sm-3 ">*Localidad :</div>
		                        <div class="col-sm-3">
		                        	<input name="txtlocalidad" type="text" class="form-control" id="txtlocalidad" value="<c:out value='${beneficiario.LOCALIDAD}'/>" style="width:350px" maxlength="50" onBlur="upperCase(this)" />
		                        </div>
		                      </div>
		                    </div>
		                      <!-- Ciudad -->
		                    <div class="row">
		                      <div class="form-group">
		                        <div class="control-label col-sm-3 ">*Municipio :</div>
		                        <div class="col-sm-3">
		                        	<input name="ciudad" type="text" class="form-control" id="ciudad" value="<c:out value='${beneficiario.CIUDAD}'/>" style="width:350px" maxlength="50" onBlur="upperCase(this)" />
		                        </div>
		                      </div>
		                    </div>
		                     <!-- Estado -->
		                    <div class="row">
		                      <div class="form-group">
		                        <div class="control-label col-sm-3 ">*Estado :</div>
		                        <div class="col-sm-3">
		                        	<input name="estado" type="text" class="form-control" id="estado" value="<c:out value='${beneficiario.ESTADO}'/>" style="width:150px" maxlength="25" onBlur="upperCase(this)" />
		                        </div>
		                      </div>
		                    </div>
		                    <!-- Codigo Postal -->
		                    <div class="row">
		                      <div class="form-group">
		                        <div class="control-label col-sm-3 ">*C&oacute;d. Postal :</div>
		                        <div class="col-sm-3">
		                        	<input name="cp" type="text" class="form-control" id="cp" value="<c:out value='${beneficiario.CODIGOPOST}'/>" style="width:150px" maxlength="5" onKeyPress=" return keyNumbero( event );" onBlur="upperCase(this)" />
		                        </div>
		                      </div>
		                    </div>
	 	     			</form>
		 	    	</div>
		 	    	<!--Tab Datos bancarios-->
		 	    	<div class="tab-pane" id="fragment-bancario">
		 	    		<form class="form-horizontal" id="formaCaptura">
		 	    			<!-- Banco -->
		                    <div class="row">
		                      <div class="form-group">
		                        <div class="control-label col-sm-3 ">Banco :</div>
		                        <div class="col-sm-3 form-group">
		                        	<select name="cbobanco" class="selectpicker form-control" id="cbobanco" style="width:350px" data-live-search="true" data-size="10" title="Seleccione un banco" >
								        <option value="0">[Seleccione]</option> 
								        	<c:forEach items="${bancos}" var="item" varStatus="status">
								        <option value='<c:out value="${item.CLV_BNCSUC}"/>' <c:if test='${item.CLV_BNCSUC==beneficiario.CLV_BNCSUC}'> selected</c:if>><c:out value='${item.BANCO}'/> <c:out value='${item.PLAZA}'/> <c:out value='${item.SUCURSAL}'/></option>
								            </c:forEach>
								    </select>  
								    <input type="hidden" name="idBanco" id="idBanco" />
		                        </div>
		                      </div>
		                    </div>
		                    <!-- Numero de Cuenta -->
		                    <div class="row">
		                      <div class="form-group">
		                        <div class="control-label col-sm-3 ">No. de Cuenta :</div>
		                        <div class="col-sm-3 form-group">
		                        	<input name="noCuenta" type="text" class="form-control" id="noCuenta" value="<c:out value='${beneficiario.NUM_CTA}'/>" style="width:150px" maxlength="20" onBlur="upperCase(this)" onkeypress=" return keyNumbero( event );" />						
		                        </div>
		                      </div>
		                    </div>
		                    <!-- Clabe -->
		                    <div class="row">
		                      <div class="form-group">
		                        <div class="control-label col-sm-3 ">Clabe :</div>
		                        <div class="col-sm-3 form-group">
		                        	<input name="clabeb" type="text" class="form-control" id="clabeb" value="<c:out value='${beneficiario.CLABE}'/>" style="width:150px" maxlength="18" onBlur="upperCase(this)" onkeypress=" return keyNumbero( event );" />						
		                        </div>
		                      </div>
		                    </div>
		                    <!-- Clabe -->
		                    <div class="row">
		                      <div class="form-group">
		                        <div class="control-label col-sm-3 ">Tipo :</div>
		                        <div class="col-sm-3 form-group">
		                        	<select name="tipoCuenta" class="form-control" id="tipoCuenta" style="width:150px">
								        <option value="" <c:if test="${beneficiario.TIPO_CTA==''}">selected</c:if>>[Selecccione]</option>
								        <option value="A" <c:if test="${beneficiario.TIPO_CTA=='A'}">selected</c:if>>Ahorro</option>
								        <option value="C" <c:if test="${beneficiario.TIPO_CTA=='C'}">selected</c:if>>Cheques</option>
								     </select>						
		                        </div>
		                      </div>
		                    </div>
	 	     			</form>
		 	    	</div><!-- Termina fragment bancario  -->
		 	    	<!-- fragment Giros  -->
		 	    	<div class="tab-pane" id="fragment-giro">
		 	    		<form class="form-horizontal" id="formaCaptura">
		 	    			  <div class="form-group"><!-- Tipo de gasto -->
						          <label for="grupo" class="col-md-2 control-label">Giros:</label>
						          <div class="col-md-5">
						   			<select name="cbogiro" class="selectpicker form-control input-sm" data-live-search="true" data-size="10" title="Seleccione un Giro" id="cbogiro">
									      <option value="0">[Todos los giros]</option>
									      <c:forEach items="${giros}" var="item" varStatus="status">
									        <option value='<c:out value="${item.ID_GIRO}"/>' <c:if test='${item.ID_GIRO==beneficiario.ID_GIRO}'> selected</c:if>><c:out value='${item.DESCRIPCION}'/></option>
									      </c:forEach>
						  			  </select>
						          </div>
					          </div>
		                 
		                    		               
	 	     			</form>
		 	    	</div><!-- Termina fragment Giro  -->
		 	    	<div class="tab-pane" id="fragment-rubro">
		 	    		<form class="form-horizontal" id="formaCaptura">
		 	    			<div class="form-group">
					          <label for="grupo" class="col-md-2 control-label">Rubros:</label>
					          <div class="col-md-5"><!-- multiple data-max-options="5" -->
					   			<select name="cborubro" class="selectpicker form-control input-sm" id="cborubro" data-live-search="true" data-size="10" title="Seleccione un Rubro">
								      <option value="0">[Todos los rubros]</option>
								      <c:forEach items="${rubros}" var="item" varStatus="status">
								        <option value='<c:out value="${item.CLV_RUBRO}"/>' <c:if test='${item.CLV_RUBRO==cborubro}'> selected</c:if>><c:out value='${item.DESCRIPCION}'/></option>
								      </c:forEach>
					  			</select>
					          </div>
					        </div>
					        <!--Archivos-->
            	 	<div class="row">
            	 		<div class="form-group">
		            		<div class="control-label col-sm-3 "></div>
		                    <div class="form-group col-sm-2">
                                <input type="button" class="btn btn-primary" name="btnNuevoRubro" id="btnNuevoRubro" value="Nuevo rubro">  
                        		<input type="button" class="btn btn-success" name="btnGuardarRubro"  id="btnGuardarRubro" value="Guardar rubro">  
					        </div>
		                    <div class="form-group col-sm-3">&nbsp;</div>
		                </div>    
                    </div>
                     <!--Tabla para el detalle de los rubros-->
                    <div class="form-group">
                    	<table style="width:90%;align:center" class="listasDetalles table table-hover" id="listaRubros">
				            <thead>
				              <tr >
				                <th width="3%" height="20"  align="center"><img src="../../imagenes/cross.png" alt="" width="16" height="16" id="imgEliminaRubro" name="imgEliminaRubro" onClick="eliminarRubros()" style="cursor:pointer"></th>
				                <th width="6%"  align="center">Cons.</th>
				                <th width="10%" align="center">Clave Rubro</th>
				                <th width="40%"  align="center">Descripción</th>
				                <th width="5%"  align="center">Estatus</th>
				                <th width="4%"  align="center">&nbsp;</th>
				              </tr>
				            </thead>
					            <tbody>
					            </tbody>
			            </table>
			        </div>  
		                 </form>
		 	    	</div><!-- Termina fragment Rubro  -->
		 	    	<!--Tab Anexos-->
            <div class="tab-pane" id="fragment-tabsDoc">
            	<form class="form-horizontal" action="//sam/reportes/uploadOneFile" id="frmDoc" name="frmDoc" method="post" enctype="multipart/form-data">
            	<input name="clv_benefi" type="hidden"  id="clv_benefi" size="8" value="" />
            		<!--Tipo Movimiento-->
            	 	<div class="row">
            	 		<div class="form-group">
		            		<div class="control-label col-sm-3 ">*Tipo de movimiento:</div>
		                    <div class="form-group col-sm-3">
		                    	<select name="tipoMovDoc" class="selectpicker form-control input-sm m-b" title="Seleccione" data-live-search="true" id="tipoMovDoc" style="width:100%">
		                            <c:forEach items="${tipoDocumentos}" var="item" varStatus="status">
				                    <option value='<c:out value="${item.T_DOCTO}"/>'
				                    <c:if test='${item.T_DOCTO==tipoMovDoc}'>selected</c:if>><c:out value="${item.DESCR}"/>
				                      </option>
				                  </c:forEach>
				                </select>
					        </div>
		                    <input type="hidden" name="idDocumento" id="idDocumento" value="0">
		                    <div class="form-group col-sm-3">&nbsp;</div>
		                </div>    
                    </div>
                <!--Número-->
            	 	<div class="row">
            	 		<div class="form-group">
		            		<div class="control-label col-sm-3 ">*Número:</div>
		                    <div class="form-group col-sm-6">
		                    	<input name="numeroDoc" type="text" class="form-control" id="numeroDoc"  style="width:180px" >
					        </div>
		                    <div class="form-group col-sm-3">&nbsp;</div>
		                </div>    
                    </div>
                <!--Notas-->
            	 	<div class="row">
            	 		<div class="form-group">
		            		<div class="control-label col-sm-3 ">*Notas:</div>
		                    <div class="form-group col-sm-6">
                                  	<input name="notaDoc" type="text" class="form-control" id="notaDoc"  style="width:180px" >
					        </div>
		                    <div class="form-group col-sm-3">&nbsp;</div>
		                </div>    
                    </div>
               		<!-- Anexos -->
            	 	<div class="row">
            	 		<div class="form-group">
		            		<div class="control-label col-sm-3 ">*Archivo:</div>
		                    <div class="form-group col-sm-6" id="div_archivo">
                                <input type="file" class="input-file" id="archivo" name="archivo" style="width:445px" accept="application/pdf"/>
                             
					        </div>
		                    <div class="form-group col-sm-3">&nbsp;</div>
		                </div>    
                    </div> 
                    <!--Archivos-->
            	 	<div class="row">
            	 		<div class="form-group">
		            		<div class="control-label col-sm-3 "></div>
		                    <div class="form-group col-sm-2">
                                <input type="button" class="btn btn-primary" name="cmdNuevoAnexo" id="cmdNuevoAnexo" value="Nuevo Anexo">  
                        		<input type="button" class="btn btn-success" name="btnGuardarAnexo"  id="btnGuardarAnexo" value="Guardar Anexo">  
                        		<input type="button" class="btn btn-success" name="btnUpload"  id="btnUpload" value="Guardar Anexo">  
                        		<input type="submit" value="Upload"> Press here to upload the file!
					        </div>
		                    <div class="form-group col-sm-3">&nbsp;</div>
		                </div>    
                    </div>
                    <div class="form-group">
                    	<table width="100%" border="0"  align="center" cellpadding="0" cellspacing="0" class="listasDetalles table table-hover" id="listasDocumentos">
				            <thead>
				              <tr >
				                <th width="3%" height="20"  align="center"><img src="../../imagenes/cross.png" alt="" width="16" height="16" id="imgEliminaAnexo" name="imgEliminaAnexo" onClick="eliminarRubros()" style="cursor:pointer"></th>
				                <th width="11%"  align="center">Tipo Movimiento</th>
				                <th width="10%" align="center">Número</th>
				                <th width="40%"  align="center">Nota</th>
				                <th width="17%"  align="center">Archivo</th>
				                <th width="7%"  align="center">Tamaño</th>
				                <th width="8%"  align="center">Tipo</th>
				                <th width="4%"  align="center">&nbsp;</th>
				              </tr>
				            </thead>
					            <tbody>
					            </tbody>
			            </table>
			        </div>    
            	</form>
            </div> 
	 	    	</div>
	 	    </div>
	 </div>
</div><!--Cierra Div tabuladores -->

<table width="100%%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td height="35" align="center">
      
    </td>
  </tr>
</table>
</form>
</body>
</html>
